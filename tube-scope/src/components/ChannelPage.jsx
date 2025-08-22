import React, { useState } from "react";
import Header from "./Header";
import VideoList from "./VideoList";
import Footer from "./Footer";


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
    </div>
  );
};

export default ChannelPage;
