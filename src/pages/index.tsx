import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import dayjs, { Dayjs } from "dayjs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import LaunchIcon from "@mui/icons-material/Launch";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [param, setParam] = useState("");
  const handleSubmit = () => {
    if (!title) {
      setAlertMessage("タイトルを入力してください");
      return;
    }
    if (!startDate) {
      setAlertMessage("開始日時を入力してください");
      return;
    }
    if (!endDate) {
      setAlertMessage("終了日時を入力してください");
      return;
    }

    const eventObject = {
      title,
      startDate: startDate.format("YYYY-MM-DDTHHmmss"),
      endDate: endDate.format("YYYY-MM-DDTHHmmss"),
      location,
    };

    console.log(eventObject);
    setAlertMessage("");
    setParam(
      `title=${eventObject.title}&start=${eventObject.startDate}&end=${eventObject.endDate}&location=${eventObject.location}`
    );
  };
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`/render/?${param}`)
      .then(() => {
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error("コピーに失敗しました: ", err);
      });
  };

  const renderedUrl = `/render/?${param}`;
  return (
    <div>
      <Header />
      <main className={`mt-24 pb-20 ${inter.className}`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold">カレンダー登録してちょうだい！</h1>
          <p className="text-xl mt-5">
            友達に
            <span className="font-bold text-orange-600">
              「この予定カレンダー入れといて！」
            </span>
            <br />
            このサイトを共有すれば、友達は自分のカレンダーに合わせて、予定をすぐには登録できます。
          </p>

          <ul className="mt-3 text-xs">
            <li>
              ※
              URLを生成する性質上、ブラウザ版を提供しているカレンダーにしか対応していません。
            </li>
            <li>
              ※
              ユーザー登録を実装するのは色々面倒なので、URLパラメーターを読み取って復元します。
            </li>
            <li>
              ※ カレンダー提供元の仕様が変わったらどうしようもありません。
            </li>
          </ul>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="mt-10 max-w-[700px] m-auto flex flex-col gap-y-4 justify-center items-center">
              <TextField
                className="w-full"
                required
                id="event_title"
                label="STEP 1: タイトル/Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <DateTimePicker
                ampm={false}
                className="w-full"
                label="STEP 2: 開始日時/Start date *"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
              <DateTimePicker
                ampm={false}
                className="w-full"
                label="STEP 3: 終了日時/End date *"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
              />
              <TextField
                className="w-full"
                id="event_location"
                label="STEP4 : 場所/Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button
                className="mt-4"
                size="large"
                variant="contained"
                onClick={handleSubmit}
              >
                URLを発行する
              </Button>
              {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
            </div>
          </LocalizationProvider>
          {param && (
            <div className="mt-8">
              <p className="font-bold text-orange-600">
                このURLを友達に共有してください！
              </p>
              <div className="flex justify-center items-center">
                <Tooltip title="コピーする">
                  <button onClick={copyToClipboard}>
                    <Card className="max-w-[700px] inline-block p-2">
                      <p className="">{renderedUrl}</p>
                    </Card>
                  </button>
                </Tooltip>
                <Tooltip title="新規タブで開く">
                  <Link href={renderedUrl}>
                    <LaunchIcon />
                  </Link>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </main>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="コピーされました！"
      ></Snackbar>
    </div>
  );
}
