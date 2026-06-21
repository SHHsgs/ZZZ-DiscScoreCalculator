"use client";

import { useEffect, useState } from "react";
import { discEffects } from "../../data/discEffects";

export interface StatusRecord {
  id: string;
  characterName: string;
  userAttackValue: number;
  discFourSetId: string;
  discTwoSetId: string;
  main5thStatusType: string;
}

interface StatusRecorderProps {
  characterName: string;
  userAttackValue: number;
  discFourSetId: string;
  discTwoSetId: string;
  main5thStatusType: string;
}

export default function StatusRecorder({
  characterName,
  userAttackValue,
  discFourSetId,
  discTwoSetId,
  main5thStatusType,
}: StatusRecorderProps) {
  const [statusRecords, setStatusRecords] = useState<StatusRecord[]>([]);

  // LocalStorage から初期データを読み込む
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("statusRecords");
      if (saved) {
        try {
          setStatusRecords(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse statusRecords from localStorage", e);
        }
      }
    }
  }, []);

  // StatusRecords が変更されたら localStorage に保存
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("statusRecords", JSON.stringify(statusRecords));
    }
  }, [statusRecords]);

  const handleSaveStatus = () => {
    const newRecord: StatusRecord = {
      id: Date.now().toString(),
      characterName,
      userAttackValue,
      discFourSetId,
      discTwoSetId,
      main5thStatusType,
    };
    setStatusRecords([newRecord, ...statusRecords]);
  };

  const handleDeleteRecord = (id: string) => {
    setStatusRecords(statusRecords.filter((record) => record.id !== id));
  };

  return (
    <div className="rounded-md border border-gray-300 p-1 flex flex-col h-full max-h-52">
      {/* 保存されたステータスリスト */}
      {statusRecords.length > 0 && (
        <div className="space-y-2 text-xs overflow-y-auto flex-1 min-h-0">
          {statusRecords.map((record) => {
            const fourSetName = discEffects.find((de) => de.id === record.discFourSetId)?.name || "";
            const twoSetName = discEffects.find((de) => de.id === record.discTwoSetId)?.name || "";
            const fourSetChar = fourSetName.slice(0, 1);
            const twoSetChar = twoSetName.slice(0, 1);
            const main5thStatusChar = record.main5thStatusType.slice(0, 1);
            
            return (
              <div
                key={record.id}
                className="rounded-md border border-gray-300 p-1 bg-white flex items-center justify-between"
              >
                <div className="flex items-center gap-1">
                  <span className="bg-blue-100 px-1 py-1 rounded">{fourSetChar}</span>
                  <span className="bg-green-100 px-1 py-1 rounded">{twoSetChar}</span>
                  <span className="bg-yellow-100 px-1 py-1 rounded">{main5thStatusChar}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold">{Math.round(record.userAttackValue * 100) / 100}</span>
                  <button
                    onClick={() => handleDeleteRecord(record.id)}
                    className="px-1 py-1 hover:bg-red-50 transition-colors flex items-center justify-center"
                    title="削除"
                  >
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 保存ボタン */}
      <div className="mt-auto pt-4 text-xs">
        <button
          onClick={handleSaveStatus}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          火力指数をメモ
        </button>
      </div>
    </div>
  );
}
