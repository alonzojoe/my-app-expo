import { useMemo, useRef, useState, useCallback } from "react";
import {
  Searchbar,
  Portal,
  Modal,
  ActivityIndicator,
  MD2Colors,
  Text as PaperText,
  Button,
} from "react-native-paper";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import SafeView from "../components/SafeView";
import { MedicalItem } from "../components/Transactions/TransactionItem";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useToggle from "../hooks/useToggle";
import { PHYSICIANS, DIAGNOSIS, SOAP } from "../constants/global";
import AdmittedForm from "../components/Transactions/AdmittedForm";
import OutPatientForm from "../components/Transactions/OutPatientForm";
import { formatDate } from "../libs/utils";
import ErrorWithRefetch from "../components/Global/ErrorWithRefetch";
import useMedicalrecords from "./../hooks/features/medical-records/useMedicalrecords";
import BottomSheet from "../components/Shared/BottomSheet";
import { useFocusEffect } from "expo-router";
import useBackHandler from "../components/Appointment/hooks/useBackHandler";

const Medical = () => {
  useBackHandler({ routePath: "/(dashboard)/home" });
  const { bottom } = useSafeAreaInsets;
  const {
    searchQuery,
    setSearchQuery,
    isFetching,
    error,
    refetch,
    filteredRecords,
    selected,
    selectRecord,
  } = useMedicalrecords();
  const bottomSheetRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [show, toggleShow] = useToggle(false);

  useFocusEffect(
    useCallback(() => {
      handleRefresh();
      console.log("effect");
    }, [refetch])
  );

  const SearchHeader = useMemo(() => {
    return (
      <View style={{ marginTop: 15, marginBottom: 15 }}>
        <Searchbar
          style={{ backgroundColor: "#FFFFFFFF" }}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
    );
  }, [searchQuery]);

  const viewMedicalRecord = () => {
    bottomSheetRef.current?.snapToIndex(2);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeView>
      {/* <TouchableOpacity onPress={() => bottomSheetRef.current?.expand()}>
        <PaperText>Open</PaperText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => bottomSheetRef.current?.collapse()}>
        <PaperText>Close</PaperText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => bottomSheetRef.current?.snapToIndex(0)}>
        <PaperText>30%</PaperText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => bottomSheetRef.current?.snapToIndex(1)}>
        <PaperText>50%</PaperText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => bottomSheetRef.current?.snapToIndex(2)}>
        <PaperText>90%</PaperText>
      </TouchableOpacity> */}
      {error ? (
        <ScrollView style={{ paddingBottom: bottom }}>
          <ErrorWithRefetch refresh={() => refetch()} />
        </ScrollView>
      ) : (
        <FlatList
          data={filteredRecords}
          keyExtractor={(item, index) =>
            `${item.PatientHistoryID}-${item.TransactionNo}-${index}`
          }
          renderItem={({ item }) => (
            <MedicalItem
              onView={() => {
                selectRecord(item);
                // toggleShow(true);
                viewMedicalRecord();
              }}
              transaction={item.TransactionNo}
              transactionDate={formatDate(item.AdmissionDateTime)}
            />
          )}
          ListHeaderComponent={SearchHeader}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingBottom: 100,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
          ListEmptyComponent={
            isFetching && !refreshing ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 15,
                }}
              >
                <ActivityIndicator
                  animating={true}
                  size="large"
                  color={MD2Colors.primary}
                />
              </View>
            ) : (
              <View style={{ padding: 20, alignItems: "center" }}>
                {!refreshing && (
                  <PaperText style={{ color: "#999" }}>
                    No transactions found.
                  </PaperText>
                )}
              </View>
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#007AFF"
              colors={["#007AFF"]}
            />
          }
        />
      )}

      <BottomSheet ref={bottomSheetRef} enableScroll={true}>
        {selected && selected.TransactionNo.toLowerCase().includes("opd") ? (
          <OutPatientForm selected={selected} onToggle={toggleShow} />
        ) : (
          <AdmittedForm
            selected={selected}
            physicians={PHYSICIANS}
            diagnosis={DIAGNOSIS}
            onToggle={toggleShow}
          />
        )}
      </BottomSheet>
      {/* <Portal>
        <Modal
          visible={show}
          onDismiss={() => toggleShow(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {selected && selected.TransactionNo.toLowerCase().includes("opd") ? (
            <OutPatientForm selected={selected} onToggle={toggleShow} />
          ) : (
            <AdmittedForm
              selected={selected}
              physicians={PHYSICIANS}
              diagnosis={DIAGNOSIS}
              onToggle={toggleShow}
            />
          )}
        </Modal>
      </Portal> */}
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
  text: {
    color: "black",
    lineHeight: 24,
  },
});
