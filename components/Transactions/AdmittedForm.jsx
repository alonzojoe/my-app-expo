import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text as PaperText } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import ContentTitle from "./ContentTitle";
import ContentData from "./ContentData";
import PhysicianItem from "./PhysicianItem";
import LoaderSpinner from "../Global/LoaderSpinner";
import ErrorFetching from "./../Global/ErrorFetching";
import { useQueries } from "@tanstack/react-query";
import {
  createPhysiciansQueryOptions,
  createDiagnosisQueryOptions,
  createLabQueryOptions,
} from "./../../services/QueryOptions/queryOptions";
import PDFIcon from "../../assets/image/png-iconv.png";
import * as WebBrowser from "expo-web-browser";

const NAS_URL = process.env.EXPO_PUBLIC_NAS_URL;

const AdmittedForm = ({ selected, onToggle }) => {
  const { TransactionNo, PatientHistoryID, ReferID } = selected;

  const [physicians, diagnosis, labresults] = useQueries({
    queries: [
      createPhysiciansQueryOptions(PatientHistoryID, ReferID),
      createDiagnosisQueryOptions(PatientHistoryID, ReferID),
      createLabQueryOptions(PatientHistoryID),
    ],
  });

  const { data: PHYSICIANS, isFetching, error } = physicians;

  const {
    data: DIAGNOSIS,
    isFetching: isLoading,
    error: errorDiagnosis,
  } = diagnosis;

  const { data: LAB_RESULTS, isFetchingLab, errorLab } = labresults;
  console.log("lab", LAB_RESULTS);

  const viewResults = async (selected) => {
    const { DocumentPath } = selected;
    try {
      let cleanPath = DocumentPath.replace(/\\/g, "/").replace(/^\//, "");

      const parts = cleanPath.split("/");
      const directory = parts.slice(0, parts.length - 1).join("/");
      const filename = parts[parts.length - 1];

      const encodedFilename = encodeURIComponent(filename);

      const finalURL = `${NAS_URL}/${directory}/${encodedFilename}`;

      console.log("Opening URL:", finalURL);

      await WebBrowser.openBrowserAsync(finalURL);
    } catch (error) {
      console.error("Error opening document:", error);
    }
  };

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <PaperText
          variant="titleMedium"
          style={{
            color: "#004C82",
            textDecorationLine: "underline",
            fontWeight: "bold",
          }}
        >
          {TransactionNo}
        </PaperText>
        {/* <PaperText onPress={() => onToggle(false)}>
          <FontAwesome5 name="times" size={20} color="#DD3254" />
        </PaperText> */}
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={true}
      >
        <View>
          <>
            <ContentTitle title="Physicians" mb={5} />
            {error ? (
              <ErrorFetching size={15} mt={10}>
                Something went wrong
              </ErrorFetching>
            ) : (
              <>
                {isFetching ? (
                  <LoaderSpinner />
                ) : (
                  <View style={{ marginBottom: 5 }}>
                    {PHYSICIANS.length === 0 ? (
                      <PaperText style={{ paddingLeft: 5 }}>-</PaperText>
                    ) : (
                      PHYSICIANS.map((p, index) => (
                        <PhysicianItem
                          key={`${p.FirstName}-${index}`}
                          physician={`${p.FirstName} ${p.MiddleName} ${p.LastName}`}
                          isMain={p.MainPhysicianTag}
                        />
                      ))
                    )}
                  </View>
                )}
              </>
            )}
          </>

          <ContentTitle title="Diagnosis" />
          {errorDiagnosis ? (
            <ErrorFetching size={15} mt={10}>
              Something went wrong
            </ErrorFetching>
          ) : isLoading ? (
            <LoaderSpinner />
          ) : (
            <>
              <ContentData
                title={`Initial Diagnosis`}
                content={DIAGNOSIS.initial || "-"}
              />
              <ContentData
                title={`Final Diagnosis`}
                content={DIAGNOSIS.final || "-"}
              />
            </>
          )}
          <ContentTitle title="Procedure Done" />
          {errorDiagnosis ? (
            <ErrorFetching size={15} mt={10}>
              Something went wrong
            </ErrorFetching>
          ) : isLoading ? (
            <LoaderSpinner />
          ) : (
            <>
              <ContentData
                title={`Main Operation`}
                content={DIAGNOSIS.MainOperation || "-"}
              />
              <ContentData
                title={`Other Operation`}
                content={DIAGNOSIS.OtherOperation || "-"}
              />
            </>
          )}

          <ContentTitle title="Laboratory results" />
          {errorLab ? (
            <ErrorFetching size={15} mt={10}>
              Something went wrong
            </ErrorFetching>
          ) : isFetchingLab ? (
            <LoaderSpinner />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {LAB_RESULTS?.length === 0 ? (
                <PaperText style={{ paddingLeft: 5 }}>-</PaperText>
              ) : (
                LAB_RESULTS?.map((res) => (
                  <TouchableOpacity
                    key={res.id}
                    onPress={() => viewResults(res)}
                    style={styles.cardTouchable}
                  >
                    <View style={styles.card}>
                      <Image source={PDFIcon} style={styles.cardImage} />
                      <Text style={styles.textContent}>
                        {res.description.toUpperCase()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          )}

          <ContentTitle title="Radiology results" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => console.log("download")}
                style={styles.cardTouchable}
              >
                <View style={styles.card}>
                  <Image source={PDFIcon} style={styles.cardImage} />
                  <Text style={styles.textContent}>{`CBC, PC`}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      {/* <View
        style={{
          flexDirection: "row",
          display: "flex",
          alignContent: "center",
          justifyContent: "flex-end",
        }}
      >
        <PaperText
          style={{ color: "#DD3254", fontWeight: "bold" }}
          onPress={() => onToggle(false)}
        >
          Close
        </PaperText>
      </View> */}
    </>
  );
};

export default AdmittedForm;

const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: "row",
    flexGrow: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    gap: 15,
    alignItems: "stretch",
    marginBottom: 15,
  },

  cardTouchable: {
    alignSelf: "stretch",
  },

  card: {
    backgroundColor: "#F8F8FA",
    padding: 15,
    width: 110,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  cardImage: {
    width: 60,
    height: 60,
  },

  textContent: {
    marginTop: 10,
    textAlign: "center",
    marginLeft: 0,
    color: "#23233D",
    fontSize: 11,
    fontWeight: "bold",
  },
});
