import FileSaver from "file-saver";
import * as XLSX from "xlsx";

interface ExportExcelDataProps {
  excelData: any;
  fileName: string;
}

const fileType =
  "application/vnd.openxmlformat-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export async function ExportExcelData({
  excelData,
  fileName,
}: ExportExcelDataProps) {
  const workSheet = XLSX.utils.json_to_sheet(excelData);
  const workSheetCellsWidth = [
    { wch: 25 },
    { wch: 10 },
    { wch: 7 },
    { wch: 10 },
  ];
  workSheet["!cols"] = workSheetCellsWidth;
  const wb = {
    Sheets: { data: workSheet },
    SheetNames: ["data"],
  };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  return FileSaver.saveAs(data, fileName + fileExtension);
}
