import Header from "@/components/Header";
import Card from "@mui/material/Card";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface EventObject {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
}

const index = () => {
  const router = useRouter();
  const [eventObject, setEventObject] = useState<EventObject | null>(null);

  useEffect(() => {
    if (router.isReady) {
      const { title, start, end, location } = router.query;
      const event = {
        title: title as string,
        startDate: dayjs(start as string).format("YYYY-MM-DDTHH:mm:ss"),
        endDate: dayjs(end as string).format("YYYY-MM-DDTHH:mm:ss"),
        location: location as string,
      };
      setEventObject(event);
    }
  }, [router.isReady, router.query]);

  if (!eventObject) {
    return <div>Loading...</div>;
  }

  const formattedStartDate = dayjs(eventObject.startDate).format(
    "YYYY年M月D日 H時mm分"
  );
  const formattedEndDate = dayjs(eventObject.endDate).format(
    "YYYY年M月D日 H時mm分"
  );
  // For Google
  const GoogleUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${
    eventObject.title
  }&dates=${eventObject.startDate
    .replace(/-/g, "")
    .replace(/:/g, "")}/${eventObject.endDate.replace(/-/g, "")}&location=${
    eventObject.location
  }`;

  // For Timetree
  const TimetreeUrl = `https://timetreeapp.com/calendars/events/new?title=${
    eventObject.title
  }&date=${eventObject.startDate.split("T")[0]}`;

  // For outlook
  const OutlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${eventObject.title}&startdt=${eventObject.startDate}&enddt=${eventObject.endDate}&location=${eventObject.location}`;

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
      <main className={`mt-24 pb-20 m:px-[5%]`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold m:text-2xl">
            カレンダー登録してちょうだい！
          </h1>
          <p>デフォルトブラウザ推奨</p>
          <div className="text-left inline-block m-auto">
            <p className="mt-2">タイトル: {eventObject.title}</p>
            <p>開始日時: {formattedStartDate}</p>
            <p>終了日時: {formattedEndDate}</p>
            <p>場所: {eventObject.location}</p>
          </div>
        </div>
        <div className="mt-10 max-w-[700px] m-auto flex flex-col gap-y-4 justify-center items-center">
          <a href={GoogleUrl} target="_blank">
            <Card className="py-2 px-1 flex justify-center items-center gap-x-2 min-w-[300px]">
              <img src="/google-calender.svg" alt="" width={32} height={32} />
              Googleカレンダーで登録
            </Card>
          </a>
          <div>
            <a href={TimetreeUrl} target="_blank">
              <Card className="py-2 px-1 flex justify-center items-center gap-x-2 min-w-[300px]">
                <img
                  src="/TimeTree_Green_Rectangle.svg"
                  alt=""
                  width={120}
                  height={32}
                />
                で登録
              </Card>
            </a>
            <p className="text-xs mt-1">
              ※ Time treeの時間/場所指定は手動でお願いします。
            </p>
          </div>
          <a href={OutlookUrl} target="_blank">
            <Card className="py-2 px-1 flex justify-center items-center gap-x-2 min-w-[300px]">
              <img src="/outlook-calender.svg" alt="" width={32} height={32} />
              Outlookカレンダーで登録
            </Card>
          </a>
        </div>
      </main>
    </div>
  );
};

export default index;
