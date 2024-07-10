import React, { useState, useEffect, useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { MdOutlinePeopleOutline } from "react-icons/md";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import mammoth from "mammoth"; // For DOCX
import { PDFDocument } from "pdf-lib"; // For PDF

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
  userPermission,
  className,
  user,
  userToken,
  permission,
  filename,
  file_id,
  workspace_id,
}) => {
  const [quill, setQuill] = useState();
  const [socket, setSocket] = useState();
  const [isTyping, setIsTyping] = useState(false);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    if (permission === 0) return;
    const s = io("/");

    setSocket(s);

    return () => {
      s.emit("leave-document", { user, file_id });
      s.disconnect();
    };
  }, [file_id]);

  useEffect(() => {
    if (permission === 0) return;
    if (socket == null || quill == null) return;

    if (permission != 3) socket.emit("join-document", { user, file_id });
    socket.once("load-document", (document) => {
      quill.setContents(document);
      if (permission === 3) {
        quill.disable();
      } else {
        quill.enable();
      }
    });

    socket.on("update-users", (connectedUsers) => {
      setUsersList(connectedUsers.filter((user) => user.permission !== 3));
    });

    socket.emit("get-document", { file_id, workspace_id, filename });
    return () => {
      socket.off("update-users");
    };
  }, [socket, quill, file_id, workspace_id, filename, permission]);

  useEffect(() => {
    if (permission === 0) return;
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

  useEffect(() => {
    if (permission === 0) return;
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
    if (permission === 0) return;
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      const content = quill.getContents();
      socket.emit("save-document", {
        userToken,
        workspace_id,
        content,
        filename,
      });
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill, workspace_id, userToken, filename]);

  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper == null) return;
      wrapper.innerHTML = "";
      const editor = document.createElement("div");
      wrapper.append(editor);
      const q = new Quill(editor, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      });
      q.disable();
      if (permission === 0) q.setText("Loading .. Document");
      if (permission !== 3) q.enable();

      setQuill(q);
    },
    [permission],
  );

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;

      let htmlContent = "";
      if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        // DOCX file
        const result = await mammoth.convertToHtml({ arrayBuffer });
        htmlContent = result.value;
      } else if (file.type === "application/pdf") {
        // PDF file
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pages = pdfDoc.getPages();
        const textPromises = pages.map(async (page) => {
          const textContent = await page.getTextContent();
          return textContent.items.map((item) => item.str).join(" ");
        });
        const texts = await Promise.all(textPromises);
        htmlContent = texts.join("\n");
      } else if (file.type === "text/html") {
        // HTML file
        htmlContent = new TextDecoder().decode(arrayBuffer);
      }

      if (quill) {
        const existingContent = quill.root.innerHTML;
        quill.clipboard.dangerouslyPasteHTML(existingContent + htmlContent);

        // Emit the changes to the server
        const delta = quill.getContents();
        socket.emit("send-changes", delta);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const userIconStyle = {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
    transition: "transform 0.3s",
  };
  const userIconsContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "10px",
    marginRight: "45px",
  };
  const tooltipStyle = {
    visibility: "hidden",
    textAlign: "center",
    borderRadius: "10px",
    padding: "0px 0",
    position: "absolute",
    zIndex: 1,
    bottom: "-35px", // Position tooltip above the icon and adjust as needed
    left: "50%",
    transform: "translateX(-50%)",
    width: "100px",
    opacity: 0,
    fontSize: "15px",
    transition: "opacity 0.3s",
    backgroundColor: "rgba(0, 0, 0.5, 0.75)", // Ensure tooltip is visible
    color: "#fff",
  };

  const showTooltip = (e) => {
    const tooltip = e.currentTarget.querySelector(".tooltip");
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = 1;
  };

  const hideTooltip = (e) => {
    const tooltip = e.currentTarget.querySelector(".tooltip");
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = 0;
  };

  return (
    <>
      <div
        style={userIconsContainerStyle}
        className="grid col-span-3 mt-3 left-align"
      >
        {usersList && usersList.length > 0 && (
          <div>
            {usersList.map((user) => (
              <div
                key={user.id}
                style={userIconStyle}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
              >
                <MdOutlinePeopleOutline style={{ fontSize: "1.8rem" }} />
                <div className="tooltip" style={tooltipStyle}>
                  {user.user && user.user.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {permission && permission <= 2 ? (
        <label
          className="flex items-center px-2 py-2 bg-[#5D3891] text-white rounded-lg cursor-pointer hover:bg-[#F99417] mb-4 transition-colorsduration-200"
          style={{ width: "fit-content" }}
        >
          <input
            type="file"
            accept=".docx, .html"
            onChange={handleFileUpload}
            className="hidden"
          />
          <span style={{ fontSize: "15px" }}>Upload File</span>
        </label>
      ) : null}

      <div
        id="container"
        ref={wrapperRef}
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      ></div>
    </>
  );
};

export default Editor;
