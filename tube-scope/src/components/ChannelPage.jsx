import React from "react";
import Header from "./Header";
import VideoList from "./VideoList";
import Footer from "./Footer";


const ChannelPage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <VideoList />
      </main>
      <Footer />
    </div>
  );
};

export default ChannelPage;
