import { StyleSheet, View, ScrollView } from "react-native";
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
} from "./../../services/QueryOptions/queryOptions";

const AdmittedForm = ({ selected, onToggle }) => {
  const { TransactionNo, PatientHistoryID, ReferID } = selected;

  const [physicians, diagnosis] = useQueries({
    queries: [
      createPhysiciansQueryOptions(PatientHistoryID, ReferID),
      createDiagnosisQueryOptions(PatientHistoryID, ReferID),
    ],
  });

  const { data: PHYSICIANS, isFetching, error } = physicians;

  const {
    data: DIAGNOSIS,
    isFetching: isLoading,
    error: errorDiagnosis,
  } = diagnosis;

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
        <PaperText onPress={() => onToggle(false)}>
          <FontAwesome5 name="times" size={20} color="#DD3254" />
        </PaperText>
      </View>
      <ScrollView>
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
          <>
            <ContentTitle title="Procedure Done" />
            {/* <ContentData
              title={`Main Operation`}
              content={diagnosis.MainOperation}
            />
            <ContentData
              title={`Other Operation`}
              content={diagnosis.OtherOperation}
            /> */}
          </>
        </View>
      </ScrollView>
      <View
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
      </View>
    </>
  );
};

export default AdmittedForm;

const styles = StyleSheet.create({});
