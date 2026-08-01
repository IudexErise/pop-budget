"use client";

import { useRouter } from "next/navigation";
import HeadlineBlock from "@components/headlineBlock/headlineBlock";
import styles from "./page.module.scss";
import { signIn, saveData, loadData, disconnect } from "@utils/googleDrive";
import { googleDriveStore } from "@state/googleDrive";
import { recordsStore, RecordProps } from "@state/records";
import GoogleButton from "@components/googleButton/googleButton";
import { useEffect, useState } from "react";

interface BackupFile {
  version: 1;
  savedAt: string | null;
  records: RecordProps[];
}

export default function Settings() {
  const router = useRouter();
  const [lastBackupDate, setLastBackupDate] = useState<string | null>(null);

  const { connected, setConnected } = googleDriveStore();

  async function handleConnect() {
    try {
      await signIn(true);

      setConnected(true);
    } catch (e) {
      console.error(e);
      alert("Failed to login via Google. Try disabling an ad blocker");
    }
  }

  async function handleSave() {
    try {
      const { records } = recordsStore.getState();

      const backup = {
        version: 1 as const,
        savedAt: new Date().toISOString(),
        records,
      };

      await saveData(backup);

      setLastBackupDate(backup.savedAt);

      alert("Saved");
      localStorage.setItem("lastBackupDate", backup.savedAt);
    } catch (e) {
      console.error(e);

      setConnected(false);

      alert("Save failed");
    }
  }

  async function handleLoad() {
    if (!confirm("Load backup? Local data will be replaced.")) {
      return;
    }

    try {
      const data = await loadData<BackupFile>();

      recordsStore.setState({
        records: data.records,
      });

      setLastBackupDate(data.savedAt);
      alert("Loaded");
    } catch (e) {
      console.error(e);

      if (
        e instanceof Error &&
        (e.message.includes("401") || e.message.includes("403"))
      ) {
        setConnected(false);
      }

      alert("Load failed");
    }
  }

  async function handleDisconnect() {
    disconnect();
    setConnected(false);
  }

  useEffect(() => {
    const savedDate = localStorage.getItem("lastBackupDate");

    if (savedDate) {
      setLastBackupDate(savedDate);
    }
  }, []);

  return (
    <div className={styles.container}>
      <HeadlineBlock headline="Settings" onClick={() => router.back()} />

      {connected ? (
        <>
          <GoogleButton text="Save to Google Drive" onClick={handleSave} />
          <GoogleButton text="Load from Google Drive" onClick={handleLoad} />
          <GoogleButton
            text="Log out from Google Drive"
            onClick={handleDisconnect}
          />
        </>
      ) : (
        <GoogleButton
          text="Sign in with Google Drive"
          onClick={handleConnect}
        />
      )}

      {lastBackupDate && (
        <p>Last backup: {new Date(lastBackupDate).toLocaleString("ru-RU")}</p>
      )}
    </div>
  );
}
