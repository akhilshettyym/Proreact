"use client"

import { useState } from "react"
import "./App.css"

function App() {
  const [text, setText] = useState("")
  const [findWord, setFindWord] = useState("")
  const [replaceWord, setReplaceWord] = useState("")
  const [mode, setMode] = useState("light")
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type })
    setTimeout(() => setAlert(null), 3000)
  }

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark")
      document.body.style.backgroundColor = "#181818"
      showAlert("Dark mode enabled", "success")
    } else {
      setMode("light")
      document.body.style.backgroundColor = "white"
      showAlert("Light mode enabled", "success")
    }
  }

  const handleUpClick = () => {
    setText(text.toUpperCase())
    showAlert("Text converted to uppercase successfully.", "success")
  }

  const handleLoClick = () => {
    setText(text.toLowerCase())
    showAlert("Text converted to lowercase successfully.", "success")
  }

  const handleClearClick = () => {
    setText("")
    setFindWord("")
    setReplaceWord("")
    showAlert("Input fields have been cleared.", "success")
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    showAlert("Text copied to clipboard.", "success")
  }

  const handleExtraSpaces = () => {
    const newText = text.split(/[ ]+/)
    setText(newText.join(" "))
    showAlert("Extra spaces removed successfully.", "success")
  }

  const handleFindReplace = () => {
    if (findWord.trim() === "") {
      showAlert("Please enter a word to find.", "warning")
      return
    }
    const newText = text.replace(new RegExp(findWord, "gi"), replaceWord)
    setText(newText)
    showAlert(`Replaced "${findWord}" with "${replaceWord}".`, "success")
  }

  const handleOnChange = (event) => {
    setText(event.target.value)
  }

  const wordCount = text.split(" ").filter((word) => word !== "").length
  const charCount = text.length
  const readingTime = (0.008 * wordCount).toFixed(2)

  return (
    <div className={`min-vh-100 ${mode === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
      {/* Header */}
      <div className="container-fluid py-3 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">ProReact - Text Manipulation Tool</h1>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkModeSwitch"
              onChange={toggleMode}
              checked={mode === "dark"}
            />
            <label className="form-check-label" htmlFor="darkModeSwitch">
              Dark Mode
            </label>
          </div>
        </div>
      </div>

      {/* Alert */}
      {alert && (
        <div
          className={`alert alert-${alert.type === "success" ? "success" : alert.type === "warning" ? "warning" : "info"} alert-dismissible fade show m-3`}
          role="alert"
        >
          {alert.msg}
        </div>
      )}

      {/* Main Content */}
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Text Input Area */}
            <div className="card mb-4" style={{ backgroundColor: mode === "dark" ? "#2d2d2d" : "white" }}>
              <div className="card-header">
                <h5 className="mb-0">Text Input</h5>
              </div>
              <div className="card-body">
                <textarea
                  className="form-control"
                  value={text}
                  onChange={handleOnChange}
                  style={{
                    backgroundColor: mode === "dark" ? "#1a1a1a" : "white",
                    color: mode === "dark" ? "white" : "black",
                    border: mode === "dark" ? "1px solid #444" : "1px solid #ced4da",
                  }}
                  rows="8"
                  placeholder="Enter your text here to analyze and manipulate..."
                ></textarea>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card mb-4" style={{ backgroundColor: mode === "dark" ? "#2d2d2d" : "white" }}>
              <div className="card-header">
                <h5 className="mb-0">Text Operations</h5>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap gap-2">
                  <button className="btn btn-primary" onClick={handleUpClick}>
                    Uppercase
                  </button>
                  <button className="btn btn-primary" onClick={handleLoClick}>
                    Lowercase
                  </button>
                  <button className="btn btn-success" onClick={handleCopy}>
                    Copy Text
                  </button>
                  <button className="btn btn-info" onClick={handleExtraSpaces}>
                    Remove Extra Spaces
                  </button>
                  <button className="btn btn-danger" onClick={handleClearClick}>
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Find and Replace */}
            <div className="card mb-4" style={{ backgroundColor: mode === "dark" ? "#2d2d2d" : "white" }}>
              <div className="card-header">
                <h5 className="mb-0">Find & Replace</h5>
              </div>
              <div className="card-body">
                <div className="row g-2">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Find..."
                      value={findWord}
                      onChange={(e) => setFindWord(e.target.value)}
                      style={{
                        backgroundColor: mode === "dark" ? "#1a1a1a" : "white",
                        color: mode === "dark" ? "white" : "black",
                        border: mode === "dark" ? "1px solid #444" : "1px solid #ced4da",
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Replace with..."
                      value={replaceWord}
                      onChange={(e) => setReplaceWord(e.target.value)}
                      style={{
                        backgroundColor: mode === "dark" ? "#1a1a1a" : "white",
                        color: mode === "dark" ? "white" : "black",
                        border: mode === "dark" ? "1px solid #444" : "1px solid #ced4da",
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <button className="btn btn-warning w-100" onClick={handleFindReplace}>
                      Replace All
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Summary */}
            <div className="card mb-4" style={{ backgroundColor: mode === "dark" ? "#2d2d2d" : "white" }}>
              <div className="card-header">
                <h5 className="mb-0">Text Summary</h5>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-md-4">
                    <div className="border rounded p-3" style={{ borderColor: mode === "dark" ? "#444" : "#dee2e6" }}>
                      <h6 className="text-muted">Words</h6>
                      <h4 className="mb-0">{wordCount}</h4>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="border rounded p-3" style={{ borderColor: mode === "dark" ? "#444" : "#dee2e6" }}>
                      <h6 className="text-muted">Characters</h6>
                      <h4 className="mb-0">{charCount}</h4>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="border rounded p-3" style={{ borderColor: mode === "dark" ? "#444" : "#dee2e6" }}>
                      <h6 className="text-muted">Reading Time</h6>
                      <h4 className="mb-0">{readingTime} min</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="card" style={{ backgroundColor: mode === "dark" ? "#2d2d2d" : "white" }}>
              <div className="card-header">
                <h5 className="mb-0">Preview</h5>
              </div>
              <div className="card-body">
                <div
                  className="p-3 rounded"
                  style={{
                    backgroundColor: mode === "dark" ? "#1a1a1a" : "#f8f9fa",
                    border: mode === "dark" ? "1px solid #444" : "1px solid #dee2e6",
                    minHeight: "100px",
                  }}
                >
                  {text.length > 0 ? text : "Enter text above to see the preview..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-5 py-3 border-top text-center">
        <p className="mb-0 text-muted">ProReact - Your versatile text manipulation tool</p>
      </footer>
    </div>
  )
}

export default App