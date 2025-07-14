"use client";
import { useEffect, useState, useRef } from "react";
import { Button, Box, Typography, Fade, IconButton, CircularProgress } from "@mui/material";
import Image from "next/image";
import CelebrationIcon from "@mui/icons-material/Celebration";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const images = ["/home1.jpg", "/home2.jpg", "/home3.jpg", "/home4.jpg"];

const adultFont = {
  fontFamily: `Geist, 'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', 'sans-serif'`,
};

// 紙吹雪アニメーション用コンポーネント
function Confetti({ show }: { show: boolean }) {
  if (!show) return null;
  // 20個の紙吹雪をランダムな位置・色で生成
  return (
    <Box sx={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 200 }}>
      {[...Array(20)].map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 1.5;
        const color = ["#ffb300", "#ff4081", "#7c4dff", "#fff176", "#f06292"][i % 5];
        return (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: "-40px",
              left: `${left}%`,
              width: 18,
              height: 18,
              borderRadius: "50%",
              bgcolor: color,
              opacity: 0.85,
              animation: `confetti-fall 1.8s ${delay}s cubic-bezier(0.4,0,0.2,1) forwards`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confetti-fall {
          to {
            top: 100vh;
            transform: rotate(360deg) scale(0.7);
            opacity: 0.5;
          }
        }
      `}</style>
    </Box>
  );
}

// BGM再生用コンポーネント
function BgmPlayer({ canPlay, alwaysShow }: { canPlay: boolean, alwaysShow?: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play();
      setPlaying(true);
    }
  };

  if (!canPlay && !alwaysShow) return null;

  return (
    <>
      <audio ref={audioRef} src="/home.MP4" loop />
      {!playing && (
        <Box sx={{ position: "fixed", left: 0, right: 0, bottom: 40, display: "flex", justifyContent: "center", zIndex: 1000 }}>
          <Button
            onClick={handlePlay}
            variant="outlined"
            color="inherit"
            size="medium"
            startIcon={<FavoriteBorderIcon sx={{ color: "#222", fontSize: 20 }} />}
            sx={{
              ...adultFont,
              fontWeight: 500,
              fontSize: { xs: "0.95rem", sm: "1rem" },
              px: 2.5,
              py: 1,
              borderRadius: 6,
              borderColor: "#222",
              color: "#222",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              textTransform: "none",
              letterSpacing: 1,
              '&:hover': {
                background: '#222',
                color: '#fff',
                borderColor: '#222',
                boxShadow: '0 4px 16px rgba(0,0,0,0.13)',
              },
            }}
          >
            音楽を再生
          </Button>
        </Box>
      )}
    </>
  );
}

export default function Home() {
  const [showGrid, setShowGrid] = useState(false);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>("light");

  // ローディング演出
  useEffect(() => {
    setTimeout(() => setLoading(false), 1800);
  }, []);

  // 画像フェードイン
  useEffect(() => {
    if (loading) return;
    images.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleImages((prev) => [...prev, idx]);
        if (idx === images.length - 1) {
          setTimeout(() => setShowGrid(true), 1200);
        }
      }, idx * 1000);
    });
  }, [loading]);

  // テーマ切り替え（bodyにクラス付与）
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  // クラッカー演出トリガー
  const handleSurprise = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // ローディング画面
  if (loading) {
    return (
      <Box sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "#111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}>
        <CelebrationIcon sx={{ color: "#ffb300", fontSize: 60, mb: 2 }} />
        <Typography
          variant="h3"
          sx={{
            ...adultFont,
            background: "linear-gradient(90deg, #ffb300 20%, #ff4081 60%, #7c4dff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
            mb: 2,
          }}
        >
          Happy Birthday!
        </Typography>
        <CircularProgress color="secondary" />
        {/* ローディング中もBGM再生ボタンを表示 */}
        <BgmPlayer canPlay={true} alwaysShow={true} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        transition: "background 0.5s",
        bgcolor: theme === "light" ? "#fff" : "#18122B",
      }}
    >
      {/* BGM再生（ローディング終了後のみ） */}
      <BgmPlayer canPlay={!loading} />
      {/* テーマ切り替えボタン */}
      <IconButton
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        sx={{
          position: "absolute",
          top: 24,
          right: 24,
          zIndex: 30,
          bgcolor: "rgba(255,255,255,0.7)",
          '&:hover': { bgcolor: "rgba(255,255,255,0.95)" },
        }}
      >
        {theme === "light" ? <NightlightIcon /> : <WbSunnyIcon />}
      </IconButton>
      {/* フェードイン or グリッド表示 */}
      {!showGrid ? (
        images.map((src, idx) => (
          <Box
            key={src}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: visibleImages.includes(idx) ? 1 : 0,
              transition: "opacity 1s",
              zIndex: idx + 1,
            }}
          >
            <Image
              src={src}
              alt={`home${idx + 1}`}
              fill
              style={{ objectFit: "cover" }}
              priority={idx === 0}
            />
          </Box>
        ))
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            opacity: showGrid ? 1 : 0,
            transition: "opacity 1.5s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {images.map((src, idx) => (
            <Box key={src} sx={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={src}
                alt={`home${idx + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
          ))}
        </Box>
      )}
      {/* 紙吹雪アニメーション */}
      <Confetti show={showConfetti} />
      {/* 半透明オーバーレイ＋中央コンテンツ */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.35)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={showGrid} timeout={1200}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography
              variant="h2"
              sx={{
                ...adultFont,
                fontWeight: 700,
                textAlign: "center",
                fontSize: { xs: "2.2rem", sm: "3.2rem", md: "4.2rem" },
                background: "linear-gradient(90deg, #ffb300 20%, #ff4081 60%, #7c4dff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                letterSpacing: 2,
                mb: 1.5,
              }}
            >
              みゆ！！お誕生日おめでとう！！
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                ...adultFont,
                color: "#555",
                mb: 4,
                textAlign: "center",
                fontSize: { xs: "1.05rem", sm: "1.15rem", md: "1.2rem" },
                fontWeight: 400,
                letterSpacing: 1,
              }}
            >
              
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                ...adultFont,
                fontWeight: 600,
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                px: 5,
                py: 1.5,
                borderRadius: 8,
                background: "linear-gradient(90deg, #ffb300 10%, #ff4081 90%)",
                boxShadow: "0 4px 24px rgba(255,64,129,0.15)",
                textTransform: "none",
                letterSpacing: 2,
                '&:hover': {
                  background: 'linear-gradient(90deg, #ff4081 10%, #ffb300 90%)',
                  transform: 'scale(1.05)',
                },
                mb: 1.5,
              }}
              onClick={handleSurprise}
            >
              特別な二日間の旅行へ
            </Button>
            <Typography
              variant="caption"
              sx={{
                ...adultFont,
                color: "#888",
                mt: 1,
                textAlign: "center",
                fontSize: { xs: "0.95rem", sm: "1.05rem" },
                letterSpacing: 1,
              }}
            >
              
            </Typography>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
}
