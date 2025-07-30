import { StyleSheet, View, ScrollView } from "react-native";
import { Text as PaperText } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import ContentTitle from "./ContentTitle";
import ContentData from "./ContentData";
import PhysicianItem from "./PhysicianItem";

const AdmittedForm = ({ selected, physicians, diagnosis, onToggle }) => {
  const { TransactionNo } = selected;

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
            <View style={{ marginBottom: 5 }}>
              {physicians.map((p) => (
                <PhysicianItem
                  key={p.id}
                  physician={p.name}
                  type={p.type}
                  isMain={p.isMain}
                />
              ))}
            </View>
          </>
          <>
            <ContentTitle title="Diagnosis" />
            <ContentData
              title={`Initial Diagnosis`}
              content={diagnosis.InitialDiagnosis}
            />
            <ContentData
              title={`Final Diagnosis`}
              content={diagnosis.FinalDiagnosis}
            />
          </>
          <>
            <ContentTitle title="Procedure Done" />
            <ContentData
              title={`Main Operation`}
              content={diagnosis.MainOperation}
            />
            <ContentData
              title={`Other Operation`}
              content={diagnosis.OtherOperation}
            />
          </>
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

export default AdmittedForm;

const styles = StyleSheet.create({});
