import React, { useState } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Editor } from "@tinymce/tinymce-react";

const RichTextEditor = ({ file }) => {
  const [content, setContent] = useState("");
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div>
      <h2 className="">{file}</h2>
      {/* <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor&nbsp;5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event) => {
          console.log(event);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      /> */}
      <div className="">
        <Editor
          className=""
          apiKey="qe8jcp2wl3s6z2uv23di1i823szo0p1cwl4p6ynrr8vwpy9k"
          init={{
            plugins:
              "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject("See docs to implement AI Assistant")
              ),
          }}
          initialValue="Welcome to TinyMCE!"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
