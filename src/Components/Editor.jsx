import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import io from "socket.io-client";
// import { socket } from "../socket";

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const Editor = ({
  content,
  className,
  user,
  permission,
  filename,
  file_id,
  workspace_id,
}) => {
  // const wrapperRef = useRef();
  const [quill, setQuill] = useState();
  const [socket, setSocket] = useState();
  const [isTyping, setIsTyping] = useState(false);
  console.log(content);

  useEffect(() => {
    if (permission == 0) return;
    const s = io("/");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [file_id]);

  useEffect(() => {
    if (permission == 0) return;
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });
    // console.log(content);
    // quill.setContents(content);
    // quill.enable();

    socket.emit("get-document", { file_id, workspace_id, filename });
  }, [socket, quill, file_id, workspace_id, filename]);

  // useEffect(async () => {
  //   if (permission == 0) return;
  //   if (socket == null || quill == null) return;

  //   quill.setContents(content);
  //   quill.enable();
  // }, [quill, content]);

  useEffect(() => {
    if (permission == 0) return;
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  //reciver
  useEffect(() => {
    if (permission == 0) return;
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (permission == 0) return;
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      const content = quill.getContents();
      socket.emit("save-document", { user, workspace_id, content, filename });
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill, workspace_id, user, filename]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    if (permission > 0) q.setText("Loading .. Document");

    setQuill(q);
  }, []);

  return (
    <>
      <div id="container" ref={wrapperRef}></div>;
    </>
  );
};
export default Editor;
