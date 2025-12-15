import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { Text as PaperText } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import LoaderSpinner from "./../Global/LoaderSpinner";
import ContentTitle from "./ContentTitle";
import ContentData from "./ContentData";
import PhysicianItem from "./PhysicianItem";
import ErrorFetching from "./../Global/ErrorFetching";
import { useQueries } from "@tanstack/react-query";
import {
  createPhysiciansQueryOptions,
  createDiagnosisQueryOptions,
  createLabQueryOptions,
} from "./../../services/QueryOptions/queryOptions";
import PDFIcon from "../../assets/image/png-iconv.png";
import { trimmedName, constructURL } from "../../libs/utils";

const OutPatientForm = ({ selected, onToggle }) => {
  const { TransactionNo, PatientHistoryID, ReferID } = selected;

  const [physicians, diagnostics, labresults] = useQueries({
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
  } = diagnostics;

  const { data: LAB_RESULTS, isFetching: isFetchingLab, errorLab } = labresults;

  const viewResults = async (selected) => {
    const { DocumentPath } = selected;
    await constructURL(DocumentPath);
  };

  console.log("service Type", selected);

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <PaperText
          variant="titleMedium"
          style={{
            color: "#23233D",
            textAlign: "center",
            fontSize: 18,
            // textDecorationLine: "underline",
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
            <ContentTitle title="Service Type" mb={0} />
            {error ? (
              <ErrorFetching size={15} mt={10}>
                Something went wrong
              </ErrorFetching>
            ) : (
              <>
                {isFetching ? (
                  <LoaderSpinner />
                ) : (
                  <View style={{ marginVertical: 10 }}>
                    <ContentData
                      title="Main and Subspecialty"
                      content={selected?.ServiceType?.toUpperCase() || "-"}
                    />
                  </View>
                )}
              </>
            )}
          </>

          <>
            <ContentTitle title="Physicians" mb={0} />
            {error ? (
              <ErrorFetching size={15} mt={10}>
                Something went wrong
              </ErrorFetching>
            ) : (
              <>
                {isFetching ? (
                  <LoaderSpinner />
                ) : (
                  <View style={{ marginBottom: 10 }}>
                    {PHYSICIANS.length === 0 ? (
                      <PaperText style={{ paddingLeft: 5, marginVertical: 10 }}>
                        -
                      </PaperText>
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

          <ContentTitle title="SOAP" />
          <View style={{ marginVertical: 10 }}>
            <>
              {errorDiagnosis ? (
                <ErrorFetching size={15} mt={10}>
                  Something went wrong
                </ErrorFetching>
              ) : isLoading ? (
                <LoaderSpinner />
              ) : (
                <>
                  <ContentData
                    title="Subjective"
                    content={DIAGNOSIS?.Subjective?.toUpperCase() || "-"}
                  />
                  <ContentData
                    title="Objective"
                    content={DIAGNOSIS?.Objective?.toUpperCase() || "-"}
                  />
                  <ContentData
                    title="Assessment"
                    content={DIAGNOSIS?.Assessment?.toUpperCase() || "-"}
                  />
                  <ContentData
                    title="Plan"
                    content={DIAGNOSIS?.PlanText?.toUpperCase() || "-"}
                  />
                </>
              )}
            </>
          </View>

          <ContentTitle title="Laboratory results" />
          <View style={{ marginVertical: 10 }}>
            {errorLab ? (
              <ErrorFetching size={15} mt={10}>
                Something went wrong
              </ErrorFetching>
            ) : (
              <>
                {isFetchingLab ? (
                  <LoaderSpinner />
                ) : (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                  >
                    {LAB_RESULTS?.length === 0 ? (
                      <PaperText style={{ paddingLeft: 0 }}>-</PaperText>
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
                              {trimmedName(res.description)}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))
                    )}
                  </ScrollView>
                )}
              </>
            )}
          </View>

          {/* <ContentTitle title="Radiology results" />
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
          </ScrollView> */}
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

export default OutPatientForm;

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
