import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import type { Avis } from "./avis-data";

// Poids restreints : sinon Remotion charge 27+ fichiers par police à chaque rendu.
const { fontFamily: montserrat } = loadMontserrat("normal", {
  weights: ["700", "800"],
  subsets: ["latin"],
});
const { fontFamily: poppins } = loadPoppins("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

/* Charte Ponti'Com */
const NUIT = "#0B1524";
const ENCRE = "#16263F";
const CIEL = "#5BC8E8";
const TURQUOISE = "#69C6B9";
const OR = "#FFC24B";
const BLANC = "#F2F6FA";
const GRIS = "#8FA6BF";

const MARGE = 80;

/**
 * La typo grandit quand l'avis est court : sinon une phrase de six mots flotte
 * dans le vide et la vidéo a l'air d'un gabarit mal rempli.
 */
const tailleCitation = (nbMots: number) => {
  if (nbMots <= 8) return 108;
  if (nbMots <= 16) return 88;
  if (nbMots <= 28) return 72;
  return 60;
};

const Etoile: React.FC<{ taille: number; delai: number }> = ({
  taille,
  delai,
}) => {
  const frame = useCurrentFrame();
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 24 24"
      style={{
        opacity: interpolate(frame, [delai, delai + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        scale: interpolate(frame, [delai, delai + 14], [0.2, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          output: "perceptual-scale",
        }),
        rotate: interpolate(frame, [delai, delai + 18], ["-35deg", "0deg"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <path
        fill={OR}
        d="M12 2.6l2.7 5.9 6.4.7-4.8 4.4 1.3 6.4L12 16.8 6.4 20l1.3-6.4L2.9 9.2l6.4-.7z"
      />
    </svg>
  );
};

export const AvisGoogle: React.FC<Avis> = ({
  auteur,
  contexte,
  note,
  citation,
  periode,
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const mots = citation.trim() ? citation.trim().split(/\s+/) : [];
  const DEBUT_TEXTE = 1.5 * fps;
  const PAS = 1.6; // frames entre deux mots
  const finTexte = DEBUT_TEXTE + mots.length * PAS + 12;

  return (
    <AbsoluteFill style={{ backgroundColor: NUIT, fontFamily: poppins }}>
      {/* Halo de marque — la seule source de couleur du fond */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 60% at 50% 12%, ${ENCRE} 0%, ${NUIT} 62%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(38% 22% at 50% 8%, ${CIEL}22 0%, transparent 70%)`,
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      <AbsoluteFill
        style={{
          padding: `${MARGE + 40}px ${MARGE}px ${MARGE + 30}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* ————— Bloc note ————— */}
        <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
          <div
            style={{
              fontFamily: montserrat,
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: 6,
              color: GRIS,
              textTransform: "uppercase",
              opacity: interpolate(frame, [6, 24], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Avis client · Google
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {Array.from({ length: Math.round(note) }).map((_, i) => (
              <Etoile key={i} taille={78} delai={14 + i * 5} />
            ))}
            <div
              style={{
                marginLeft: 18,
                fontFamily: montserrat,
                fontWeight: 800,
                fontSize: 64,
                color: BLANC,
                opacity: interpolate(frame, [40, 56], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {note.toFixed(1).replace(".", ",")}
            </div>
          </div>
        </div>

        {/* ————— Citation ————— */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingBottom: height * 0.04,
          }}
        >
          {/* Signature : le guillemet français, posé comme une marque */}
          <div
            style={{
              fontFamily: montserrat,
              fontWeight: 800,
              fontSize: 170,
              lineHeight: 0.7,
              height: 118,
              color: TURQUOISE,
              opacity: interpolate(frame, [30, 54], [0, 0.34], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: interpolate(
                frame,
                [30, 60],
                ["-24px 0px", "0px 0px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              ),
            }}
          >
            «
          </div>

          {mots.length > 0 ? (
            <div
              style={{
                position: "relative",
                fontSize: tailleCitation(mots.length),
                lineHeight: 1.34,
                fontWeight: 500,
                color: BLANC,
                letterSpacing: -0.5,
              }}
            >
              {mots.map((mot, i) => {
                const d = DEBUT_TEXTE + i * PAS;
                return (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      marginRight: "0.26em",
                      opacity: interpolate(frame, [d, d + 10], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                      translate: interpolate(
                        frame,
                        [d, d + 16],
                        ["0px 26px", "0px 0px"],
                        {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                          easing: Easing.bezier(0.16, 1, 0.3, 1),
                        },
                      ),
                    }}
                  >
                    {mot}
                  </span>
                );
              })}
            </div>
          ) : (
            /* Avis sans texte : la note devient le sujet */
            <div
              style={{
                fontFamily: montserrat,
                fontWeight: 800,
                fontSize: 96,
                lineHeight: 1.15,
                color: BLANC,
                opacity: interpolate(frame, [DEBUT_TEXTE, DEBUT_TEXTE + 20], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                translate: interpolate(
                  frame,
                  [DEBUT_TEXTE, DEBUT_TEXTE + 26],
                  ["0px 30px", "0px 0px"],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  },
                ),
              }}
            >
              Cinq étoiles,
              <br />
              sans un mot.
            </div>
          )}
        </div>

        {/* ————— Attribution + signature ————— */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
            opacity: interpolate(frame, [finTexte, finTexte + 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [finTexte, finTexte + 24],
              ["0px 34px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          <div
            style={{
              height: 4,
              width: 132,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${CIEL}, ${TURQUOISE})`,
            }}
          />
          <div>
            <div
              style={{
                fontFamily: montserrat,
                fontWeight: 800,
                fontSize: 52,
                color: BLANC,
              }}
            >
              {auteur}
            </div>
            <div style={{ fontSize: 34, color: GRIS, marginTop: 8 }}>
              {contexte} · {periode}
            </div>
          </div>

          <div
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "baseline",
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: montserrat,
                fontWeight: 800,
                fontSize: 42,
                background: `linear-gradient(96deg, ${CIEL}, ${TURQUOISE})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              ponticom.fr
            </span>
            <span style={{ fontSize: 30, color: GRIS }}>
              Création de sites — Toulouse &amp; Guyane
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Durée calée sur la longueur du texte, pour que chaque avis respire pareil. */
export const dureeAvis = (citation: string, fps: number) => {
  const mots = citation.trim() ? citation.trim().split(/\s+/).length : 0;
  return Math.round(1.5 * fps + mots * 1.6 + 12 + 2.6 * fps);
};
