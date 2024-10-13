import React, { useState, useRef, useEffect } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Slider } from "../components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group"
import { Pencil, Square, Circle, Eraser, Share2 } from 'lucide-react'

export default function Canvas() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState("#000000")
  const [brushSize, setBrushSize] = useState(5)
  const [tool, setTool] = useState("pencil")
  const [sessionId, setSessionId] = useState("")

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.lineCap = 'round'
        context.lineJoin = 'round'
      }
    }
  }, [])

  const startDrawing = (e) => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.beginPath()
        context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        setIsDrawing(true)
      }
    }
  }

  const draw = (e) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.strokeStyle = color
        context.lineWidth = brushSize

        if (tool === 'eraser') {
          context.globalCompositeOperation = 'destination-out'
        } else {
          context.globalCompositeOperation = 'source-over'
        }

        if (tool === 'square') {
          context.rect(
            e.nativeEvent.offsetX - brushSize / 2,
            e.nativeEvent.offsetY - brushSize / 2,
            brushSize,
            brushSize
          )
          context.fill()
        } else if (tool === 'circle') {
          context.beginPath()
          context.arc(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY,
            brushSize / 2,
            0,
            2 * Math.PI
          )
          context.fill()
        } else {
          context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
          context.stroke()
        }
      }
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const createSession = () => {
    const newSessionId = Math.random().toString(36).substring(7)
    setSessionId(newSessionId)
    // Here you would typically send this session ID to your backend
    // and set up the real-time collaboration infrastructure
  }

  const shareSession = () => {
    if (sessionId) {
      const shareUrl = `${window.location.origin}/canvas/${sessionId}`
      navigator.clipboard.writeText(shareUrl)
      alert(`Session URL copied to clipboard: ${shareUrl}`)
    } else {
      alert("Please create a session first")
    }
  }

  return (
    (<div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Online Canvas</h1>
          <div className="flex gap-2">
            <Button onClick={createSession}>Create Session</Button>
            <Button onClick={shareSession} disabled={!sessionId}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </div>
        
        <div className="flex gap-4 mb-4">
          <ToggleGroup
            type="single"
            value={tool}
            onValueChange={(value) => value && setTool(value)}>
            <ToggleGroupItem value="pencil" aria-label="Pencil">
              <Pencil className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="square" aria-label="Square">
              <Square className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="circle" aria-label="Circle">
              <Circle className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="eraser" aria-label="Eraser">
              <Eraser className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-10" />
          
          <div className="flex items-center gap-2 flex-grow">
            <span>Size:</span>
            <Slider
              value={[brushSize]}
              onValueChange={(value) => setBrushSize(value[0])}
              max={50}
              step={1}
              className="w-full" />
          </div>
        </div>
        
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          className="border border-gray-300 rounded-lg w-full h-[600px] cursor-crosshair" />
      </div>
    </div>)
  );
}