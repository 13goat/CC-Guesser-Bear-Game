
export enum StorageKey{
    GROUP_OF_BOX_ID = "group-of-box-ID",
    USER_DATA = "user-data", // สำหรับโหลดข้อมูลผู้เล่น เช่่น ชื่อ เหรียญ
    SERIES_COLLECTED = "series-collected", // ข้อมูล สถานะของ Serie  ยังไม่ได้เล่น , เล่นค้างไว้, กำลังเล่น, เล่นครบหมดแล้ว
    CHARACTER_COLLECTED_SERIE = "character-collected-serie", // BEAR_COLLECTED_SERIE + ${number} // ข้อมูล Character ที่ได้รับแล้ว ของแต่ละ Serie
}