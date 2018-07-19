/**
 * Created by admin on 17/8/8.
 */
// 医院级别
export function formatHospitalLevel(value) {
  switch (parseInt(value)) {
    case 11:
      return '一级甲等';
    case 12:
      return '一级乙等';
    case 13:
      return '一级丙等';
    case 14:
      return '一级特等';
    case 21:
      return '二级甲等';
    case 22:
      return '二级乙等';
    case 23:
      return '二级丙等';
    case 31:
      return '三级甲等';
    case 32:
      return '三级乙等';
    case 33:
      return '三级丙等';
  }
}
// 医生级别
export function formatDoctorLevel(value) {
  switch (parseInt(value)) {
    case 1:
      return '住院医生';
    case 2:
      return '主治医生';
    case 3:
      return '主任医生';
    case 4:
      return '副主任医生';
    case 5:
      return '助理';
  }
}
