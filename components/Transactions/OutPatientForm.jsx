import { StyleSheet, View, ScrollView } from "react-native";
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
} from "./../../services/QueryOptions/queryOptions";

const OutPatientForm = ({ selected, onToggle }) => {
  const { TransactionNo, PatientHistoryID, ReferID } = selected;

  const [physicians, diagnostics] = useQueries({
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
  } = diagnostics;

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
          <ContentTitle title="SOAP" />
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
                  content={DIAGNOSIS?.Subjective || "-"}
                />
                <ContentData
                  title="Objective"
                  content={DIAGNOSIS?.Objective || "-"}
                />
                <ContentData
                  title="Assessment"
                  content={DIAGNOSIS?.Assessment || "-"}
                />
                <ContentData
                  title="Plan"
                  content={DIAGNOSIS?.PlanText || "-"}
                />
              </>
            )}
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
      <View style={{ marginVertical: 10 }} />
    </>
  );
};

export default OutPatientForm;

const styles = StyleSheet.create({});
