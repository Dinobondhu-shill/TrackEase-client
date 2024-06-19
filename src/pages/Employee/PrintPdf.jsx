import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { useLoaderData } from "react-router-dom";

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop:40,
    paddingBottom: 30,
    width:300,
    textAlign:'center'
  },
  header: {
   paddingTop:80,
    display: 'block',
    padding: 10,
    textAlign: 'center',
    fontSize: 28,
    alignSelf: 'center',
    width: '100%'
  },
  // Product details
  product: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    gap:20,
    fontWeight: 'semi-bold',
    marginTop:10,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    paddingHorizontal: 10
  },
  tableRow: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  tableCell: {
    fontSize: 16,
    margin: 20
  }
 
});

const PrintPdf = () => {
  const data = useLoaderData()
  console.log(data)
  return (
    <Document>
    <Page size="A4" style={styles.body}>
      <View style={styles.header}>
        <Text>{data.company}</Text>
      </View>
      <View style={styles.product}>
        <Text>
          Asset Name: {data.product}
        </Text>
        <Text>
          Asset Id: {data.assetId}
        </Text>
        <Text>
          Requested By: {data.requesterName}
        </Text>
      </View>
      <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              Product Type: {data.productType}
            </Text>
            <Text style={styles.tableCell}>
              Requested Date: {data.requestedDate}
            </Text>
            <Text style={styles.tableCell}>
              Approved Date: {data.approvedDate}
            </Text>
          </View>
        </View>
      
    </Page>
  </Document>
  );
};

export default PrintPdf;