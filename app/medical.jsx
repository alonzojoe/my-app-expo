import { StyleSheet, Text, View } from "react-native";
import React, { useState, useMemo } from "react";
import SafeView from "../components/SafeView";
import {
  Searchbar,
  Portal,
  Modal,
  Text as PaperText,
} from "react-native-paper";
import TransactionItem from "../components/Transactions/TransactionItem";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MEDICAL_RECORDS } from "../constants/global";
import useDebounce from "./../hooks/useDebounce";
import useToggle from "../hooks/useToggle";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ContentTitle from "../components/Transactions/ContentTitle";
import ContanteData from "../components/Transactions/ContentData";
import { PHYSICIANS } from "../constants/global";
import PhysicianItem from "./../components/Transactions/PhysicianItem";
const Medical = () => {
  const { bottom } = useSafeAreaInsets;
  const [searchQuery, setSearchQuery] = useState("");
  const debounceValue = useDebounce(searchQuery);
  const [show, toggleShow] = useToggle(false);

  const searchDebounce = useDebounce(searchQuery);

  const filteredRecords = useMemo(() => {
    const query = (searchDebounce || "").trim().toLowerCase();

    return MEDICAL_RECORDS.filter(
      (record) =>
        (record.transactionNo || "").toLowerCase().includes(query) ||
        (record.transactionDate || "").toLowerCase().includes(query)
    );
  }, [searchDebounce]);

  return (
    <SafeView>
      <ScrollView style={{ paddingBottom: bottom }}>
        <View style={styles.container}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            marginTop: 15,
            gap: 10,
            marginBottom: 5,
          }}
        >
          {filteredRecords.map((medical) => (
            <TransactionItem
              onView={() => toggleShow(true)}
              key={medical.id}
              transaction={medical.transactionNo}
              transactionDate={medical.transactionDate}
            />
          ))}
        </View>
      </ScrollView>
      <Portal>
        <Modal
          visible={show}
          onDismiss={() => toggleShow(false)}
          contentContainerStyle={styles.modalContainer}
        >
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
                    {PHYSICIANS.map((p) => (
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
        </Modal>
      </Portal>
    </SafeView>
  );
};

export default Medical;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 18,
  },
  modalContainer: {
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: "white",
    padding: 20,
  },
});
