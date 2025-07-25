import { StyleSheet, View, ScrollView } from "react-native";
import { Text as PaperText } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import ContentTitle from "./ContentTitle";
import PhysicianItem from "./PhysicianItem";

const AdmittedForm = ({ physicians, diagnosis, toggleShow }) => {
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
          IN-72025-428087
        </PaperText>
        <PaperText onPress={() => toggleShow(false)}>
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
            <ContanteData
              title={`Initial Diagnosis`}
              content={`GRAVIDA 2 PARA 2 (2002) ABNORMAL UTERINE BLEEDING- ENDOMETRIALPOLYP, S/P HYSTEROSCOPIC GUIDED POLYPECTOMY, SEVERE ANEMIA SECONDARY TO ACUTE BLOOD LOSS`}
            />
            <ContanteData
              title={`Final Diagnosis`}
              content={`GRAVIDA 2 PARA 2 (2002) ABNORMAL UTERINE BLEEDING - ENDOMETRIAL POLYP STATUS POST HYSTEROSCOPIC GUIDED POLYPECTOMY SEVERE ANEMIA SECONDARY TO AUTE BLOOD LOSS -CORRECTED`}
            />
          </>
          <>
            <ContentTitle title="Procedure Done" />
            <ContanteData
              title={`Main Operation`}
              content={`BLOOD TRANSFUSION`}
            />
            <ContanteData title={`Other Operation`} content={`-`} />
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
            onPress={() => toggleShow(false)}
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
