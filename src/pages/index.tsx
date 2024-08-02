import { Inter } from "next/font/google";
import Header from "@/components/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { Dayjs } from "dayjs";
import Card from "@mui/material/Card";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import LaunchIcon from "@mui/icons-material/Launch";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

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

  const router = useRouter();
  const path = router.pathname;
  return (
    <div>
      <Head>
        <title>カレンダー登録してちょうだい！</title>
        <meta
          name="description"
          content={
            "「この予定カレンダー入れといて！」このサイトを共有すれば、友達は自分のカレンダーに合わせて、予定をすぐには登録できます。"
          }
        />
        <meta property="og:title" content={`カレンダー登録してちょうだい！`} />
        <meta
          property="og:description"
          content={
            "「この予定カレンダー入れといて！」このサイトを共有すれば、友達は自分のカレンダーに合わせて、予定をすぐには登録できます。"
          }
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`カレンダー登録してちょうだい！`} />
        <meta
          name="twitter:description"
          content={
            "「この予定カレンダー入れといて！」このサイトを共有すれば、友達は自分のカレンダーに合わせて、予定をすぐには登録できます。"
          }
        />
        <link rel="canonical" href={`${path}`} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Header />
      <main className={`mt-24 pb-20 m:px-[5%] min-h-[87vh] ${inter.className}`}>
        <div className="text-center">
          <h1 className="text-3xl font-bold m:text-2xl">
            カレンダー登録してちょうだい！
          </h1>
          <p className="text-xl mt-5">
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
            <li>※ 以下のカレンダーにしか対応してません、ごめん。</li>
          </ul>
          <div className="flex justify-center items-center gap-x-3">
            <img
              src="/google-calender.svg"
              alt="Google カレンダー"
              width={32}
              height={32}
            />
            <img
              src="/outlook-calender.svg"
              alt="Outlookカレンダー"
              width={32}
              height={32}
            />
            <img
              src="/timetree-calender.svg"
              alt="Time tree"
              width={32}
              height={32}
            />
          </div>

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
                  <Link href={renderedUrl} target="_blank">
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
      <Footer />
    </div>
  );
}
