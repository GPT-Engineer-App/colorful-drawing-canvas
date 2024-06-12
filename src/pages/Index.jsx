import React, { useRef, useState, useEffect } from "react";
import { Box, Button, HStack, VStack } from "@chakra-ui/react";

const colors = ["#FF0000", "#0000FF", "#FFFF00", "#000000", "#FFFFFF"]; // Mondrian color palette

const Index = () => {
  const canvasRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = currentColor;
    context.lineJoin = "round";
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <Box width="100vw" height="100vh" position="relative">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ display: "block" }}
      />
      <VStack position="absolute" top={4} left={4} spacing={4}>
        {colors.map((color) => (
          <Button
            key={color}
            bg={color}
            width="40px"
            height="40px"
            onClick={() => setCurrentColor(color)}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Index;