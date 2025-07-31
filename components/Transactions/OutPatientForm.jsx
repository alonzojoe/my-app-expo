import { StyleSheet, View, ScrollView } from "react-native";
import { Text as PaperText } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import LoaderSpinner from "./../Global/LoaderSpinner";
import ContentTitle from "./ContentTitle";
import ContentData from "./ContentData";
import PhysicianItem from "./PhysicianItem";
import { useQueries } from "@tanstack/react-query";
import {
  createPhysiciansQueryOptions,
  createDiagnosisQueryOptions,
} from "./../../services/QueryOptions/queryOptions";

const OutPatientForm = ({ selected, onToggle }) => {
  const { TransactionNo, PatientHistoryID, ReferID } = selected;

  const [physicianss, diagnostics] = useQueries({
    queries: [
      createPhysiciansQueryOptions(PatientHistoryID, ReferID),
      createDiagnosisQueryOptions(PatientHistoryID, ReferID),
    ],
  });

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
          {TransactionNo} {PatientHistoryID} {ReferID}
        </PaperText>
        <PaperText onPress={() => onToggle(false)}>
          <FontAwesome5 name="times" size={20} color="#DD3254" />
        </PaperText>
      </View>
      <ScrollView>
        <View>
          <>
            <ContentTitle title="Physicians" mb={5} />
            <LoaderSpinner />
            <View style={{ marginBottom: 5 }}>
              {/* {physicians.map((p) => (
                <PhysicianItem
                  key={p.id}
                  physician={p.name}
                  type={p.type}
                  isMain={p.isMain}
                />
              ))} */}
            </View>
          </>
          {/* <>
            <ContentTitle title="SOAP" />
            <ContentData title={`Subjective`} content={soap.Subjective} />
            <ContentData title={`Objective`} content={soap.Objective} />
          </>
          <>
            <ContentData title={`Assessment`} content={soap.Assessment} />
            <ContentData title={`Plan`} content={soap.Plan} />
          </> */}
        </View>
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
      </ScrollView>
      <View style={{ marginVertical: 10 }} />
    </>
  );
};

export default OutPatientForm;

const styles = StyleSheet.create({});
