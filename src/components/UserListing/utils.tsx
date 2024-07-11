import { User } from "@/services/types";
import { getFormatedDate } from "@/ustils/common.utils";

export const EscortExportToCSV = (data: User[]) => {
  const header =
    "ID, Name, Username, Email,	Mobile Number, Gender, Birth Date,\r\n";

  const csvLines = data.map((item: User) => {
    const id = item.id || "-";
    const name = item.firstName || "" + " " + item.lastName || "-";
    const username = item.username || "-";
    const email = item.email || "-";
    const mobileNumber = item.phone || "-";
    const gender = item.gender || "-";

    const birthDate = getFormatedDate(item.birthDate) || "-";
    return `${id},${name},${username},${email},${mobileNumber},${gender},${birthDate},\r\n`;
  });

  const csvData = header + csvLines.join("");

  return csvData;
};

export const exportCSVData = (csvData: string, name: string) => {
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
};
