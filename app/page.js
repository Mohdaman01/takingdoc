"use client"

import React, { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState([]);

  const fileSubmitHandler = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      try {

        const data = new FormData();
        data.set('file', selectedFile);

        const res = await fetch(`/api/upload/`, {
          method: 'POST',
          body: data,
        });

        if (!res.ok) throw new Error(await res.text());
        return;
      } catch (err) {
        console.log('error in uploading pdf => ', err);
        return;
      }
    }
  }

  const querySubmitHandler = async (e) => {
    e.preventDefault();

    if (query) {

      try {

        setChat(prev => [...prev, { type: "query", chat: query }]);

        const data = new FormData();
        data.set('query', query);

        setQuery("");
        setSelectedFile(null);

        const res = await fetch('/api/query', {
          method: 'POST',
          body: data,
        });

        if (!res.ok) throw new Error(await res.text());

        const response = await res.json();

        setChat(prev => [...prev, { type: "answer", chat: response.answer }]);

        return;

      } catch (err) {
        console.log('error in sending query =>', err);
        return;
      }
    }
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="max-w-[550px] mb-8 text-center" >
        <h1
          className="m-6 py-2 px-4 mb-8 text-[50px] bg-slate-400 rounded-[10px]"
        >TalkingDoc</h1>
        <p className="text-[1.3rem]" >
          Upload your pdf format document and chat with it. 
          <br/>
          Ask all kind of question regarding the content of the document. 
        </p>
      </div>

      <div className="w-full max-w-[670px]">
        <div className="flex items-center mb-8 border-2 border-black h-24  mx-auto max-w-[400px] p-4 justify-center rounded-[10px] bg-slate-200 ">
          <form onSubmit={e => fileSubmitHandler(e)}>
            <input
              className=""
              type="file" onChange={e => handleFileChange(e)} accept=".pdf"
              required
            />
            <button className="border-2 border-black w-[80px] p-2 rounded-[10px] bg-blue-400 m-2">
              upload
            </button>
          </form>
        </div>

        <div className="chat__room h-[500px] border-2 border-black p-4 rounded-[10px] bg-slate-300">

          <div className="chat__dispaly w-full h-[420px] border-2 border-black mb-2 overflow-auto rounded-[10px] bg-slate-600">

            {selectedFile === null ?
              <div><p className="inline-block m-2 ml-4 p-2 bg-green-500 rounded-[10px] max-w-[450px]">Upload a document or Chat with existing one</p>
              </div>
              :
              <div><p className="inline-block m-2 ml-4 p-2 bg-green-500 rounded-[10px] max-w-[450px]">Ask me any question regarding the uploaded document.</p></div>
            }

            {chat.map((chat) => {

              if (chat.type === "query") {

                return (
                  <div className="flex justify-end" >
                    <p className="m-2 mr-4 p-2 bg-gray-400 rounded-[10px] inline-block" >{chat.chat}</p>

                  </div>
                )
              } else {

                return (

                  <div className="flex justify-start" >
                    <p className="inline-block m-2 max-w-[460px] ml-4 p-2 bg-green-500 rounded-[10px]">
                      {chat.chat}
                    </p>

                  </div>

                )
              }
            })}
          </div>
          <form
            className="flex"
            onSubmit={e => querySubmitHandler(e)}
          >
            <input className="h-[40px] border-2 w-full border-black border-r-transparent rounded-l-[10px] pl-[15px]" type="text" onChange={e => handleQueryChange(e)} value={query} />
            <button className="border-2 border-black w-[100px] rounded-r-[10px] bg-blue-700 text-cyan-100"
              disabled={query === "" ? true : false}
            >
              send
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
