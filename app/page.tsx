"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check } from "lucide-react"

export default function SignatureGenerator() {
  const [name, setName] = useState("Brahim Adam")
  const [position, setPosition] = useState("Civil Designer")
  const [email, setEmail] = useState("brahim@comehometoafrica.com")
  const [copied, setCopied] = useState(false)
  const signatureRef = useRef<HTMLDivElement>(null)

  const handleCopy = async () => {
    if (signatureRef.current) {
      try {
        const htmlContent = signatureRef.current.innerHTML
        
        // Use Clipboard API to copy HTML content
        const blob = new Blob([htmlContent], { type: "text/html" })
        const clipboardItem = new ClipboardItem({
          "text/html": blob,
          "text/plain": new Blob([signatureRef.current.innerText], { type: "text/plain" })
        })
        
        await navigator.clipboard.write([clipboardItem])

        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        // Fallback for browsers that don't support ClipboardItem
        try {
          const range = document.createRange()
          range.selectNodeContents(signatureRef.current)
          const selection = window.getSelection()
          selection?.removeAllRanges()
          selection?.addRange(range)
          document.execCommand("copy")
          selection?.removeAllRanges()
          
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (fallbackErr) {
          console.error("Failed to copy:", fallbackErr)
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Email Signature Generator</h1>
          <p className="mt-2 text-muted-foreground">
            Fill in your details, then copy the signature and paste it into Gmail
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Your Details</CardTitle>
              <CardDescription>Enter your information below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position / Title</Label>
                <Input
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Enter your position"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>How to Use in Gmail</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal space-y-2 pl-4 text-sm text-muted-foreground">
                <li>Fill in your details on the left</li>
                <li>Click the <strong>"Copy Signature"</strong> button below</li>
                <li>Open Gmail and go to <strong>Settings</strong> (gear icon)</li>
                <li>Click <strong>"See all settings"</strong></li>
                <li>Scroll down to <strong>"Signature"</strong> section</li>
                <li>Create a new signature or edit existing one</li>
                <li><strong>Press Ctrl+V (or Cmd+V on Mac)</strong> to paste</li>
                <li>Scroll down and click <strong>"Save Changes"</strong></li>
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Signature Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Signature Preview</CardTitle>
              <CardDescription>This is how your signature will look</CardDescription>
            </div>
            <Button onClick={handleCopy} className="gap-2">
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Signature
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto rounded-lg border bg-white p-4">
              {/* The actual signature that will be copied */}
              <div ref={signatureRef}>
                <table
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontSize: "12px",
                    color: "#2c3e50",
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: "top", paddingRight: "20px" }}>
                        <a
                          href="https://ComeHomeToAfrica.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          <img
                            src="https://i.ibb.co/DfKBBtxp/panafrica-logo.png"
                            alt="Come Home To Africa"
                            width={150}
                            style={{ border: 0, display: "block", maxWidth: "150px" }}
                          />
                        </a>
                      </td>
                      <td style={{ verticalAlign: "top" }}>
                        <table cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td style={{ paddingBottom: "5px" }}>
                                <span
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                    color: "#1a5276",
                                  }}
                                >
                                  {name}
                                </span>
                                <br />
                                <span style={{ color: "#7f8c8d", fontSize: "11px" }}>
                                  {position} | Pan Africa Group of Companies
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ paddingBottom: "5px", fontSize: "11px" }}>
                                <table cellPadding={0} cellSpacing={0} border={0}>
                                  <tbody>
                                    <tr>
                                      <td width={20} style={{ paddingBottom: "3px", verticalAlign: "middle" }}>
                                        <img
                                          src="https://cdn-icons-png.flaticon.com/512/597/597177.png"
                                          alt="Phone"
                                          width={12}
                                          height={12}
                                          style={{ display: "block" }}
                                        />
                                      </td>
                                      <td style={{ paddingBottom: "3px", verticalAlign: "middle" }}>705-408-3583</td>
                                    </tr>
                                    <tr>
                                      <td width={20} style={{ paddingBottom: "3px", verticalAlign: "middle" }}>
                                        <img
                                          src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
                                          alt="Toll Free"
                                          width={12}
                                          height={12}
                                          style={{ display: "block" }}
                                        />
                                      </td>
                                      <td style={{ paddingBottom: "3px", verticalAlign: "middle" }}>1 (888) 510-1057</td>
                                    </tr>
                                    <tr>
                                      <td width={20} style={{ paddingBottom: "3px", verticalAlign: "middle" }}>
                                        <img
                                          src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                                          alt="Location"
                                          width={12}
                                          height={12}
                                          style={{ display: "block" }}
                                        />
                                      </td>
                                      <td style={{ paddingBottom: "3px", verticalAlign: "middle" }}>215 South Liberation Link, Accra Ghana</td>
                                    </tr>
                                    <tr>
                                      <td width={20} style={{ paddingBottom: "3px", verticalAlign: "middle" }}>
                                        <img
                                          src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                                          alt="Email"
                                          width={12}
                                          height={12}
                                          style={{ display: "block" }}
                                        />
                                      </td>
                                      <td style={{ paddingBottom: "3px", verticalAlign: "middle" }}>
                                        <a
                                          href={`mailto:${email}`}
                                          style={{ color: "#2c3e50", textDecoration: "none" }}
                                        >
                                          {email}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width={20} style={{ paddingBottom: "3px", verticalAlign: "middle" }}>
                                        <img
                                          src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
                                          alt="Website"
                                          width={12}
                                          height={12}
                                          style={{ display: "block" }}
                                        />
                                      </td>
                                      <td style={{ paddingBottom: "3px", verticalAlign: "middle" }}>
                                        <a
                                          href="https://www.ComeHomeToAfrica.com"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          style={{ color: "#2c3e50", textDecoration: "none" }}
                                        >
                                          www.ComeHomeToAfrica.com
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ padding: "8px 0 10px 0" }}>
                                <table cellPadding={0} cellSpacing={0}>
                                  <tbody>
                                    <tr>
                                      <td style={{ paddingRight: "10px" }}>
                                        <a
                                          href="https://www.facebook.com/comehometoafrica"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          style={{ textDecoration: "none" }}
                                        >
                                          <img
                                            src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                                            alt="Facebook"
                                            width={18}
                                            style={{ display: "block" }}
                                          />
                                        </a>
                                      </td>
                                      <td style={{ paddingRight: "10px" }}>
                                        <a
                                          href="https://www.instagram.com/comehome2af/"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          style={{ textDecoration: "none" }}
                                        >
                                          <img
                                            src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                                            alt="Instagram"
                                            width={18}
                                            style={{ display: "block" }}
                                          />
                                        </a>
                                      </td>
                                      <td>
                                        <a
                                          href="https://youtube.com/comehometoafrica"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          style={{ textDecoration: "none" }}
                                        >
                                          <img
                                            src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                                            alt="YouTube"
                                            width={18}
                                            style={{ display: "block" }}
                                          />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  fontWeight: "bold",
                                  color: "#000000",
                                  fontSize: "10px",
                                  paddingTop: "8px",
                                  borderTop: "1px dashed #bdc3c7",
                                }}
                              >
                                "Come Home To Africa. It's not only home, it's where you belong."
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong>If images don't show in Gmail:</strong> Gmail may block external images initially. 
              Ask recipients to click "Display images below" or add your email to their contacts.
            </p>
            <p>
              <strong>If formatting looks wrong:</strong> Make sure you're pasting into the signature 
              editor (not composing an email). Use Ctrl+V or Cmd+V to paste.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
