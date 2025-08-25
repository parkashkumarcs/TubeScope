import React, { useState } from "react";
import Header from "./Header";
import VideoList from "./VideoList";
import Footer from "./Footer";
import Chatbot from "./Chatbot";


const ChannelPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <main>
        <VideoList searchQuery={searchQuery} />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ChannelPage;
