import "./index.css";
import { Composition } from "remotion";
import { AvisGoogle, dureeAvis } from "./AvisGoogle";
import { AVIS, avisSchema, idDepuisAuteur } from "./avis-data";

const FPS = 30;
const LARGEUR = 1080;
const HAUTEUR = 1920;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {AVIS.map(({ citationComplete: _ignore, ...avis }) => (
        <Composition
          key={avis.auteur}
          id={idDepuisAuteur(avis.auteur)}
          component={AvisGoogle}
          schema={avisSchema}
          defaultProps={avis}
          fps={FPS}
          width={LARGEUR}
          height={HAUTEUR}
          durationInFrames={dureeAvis(avis.citation, FPS)}
          calculateMetadata={({ props }) => ({
            durationInFrames: dureeAvis(props.citation, FPS),
          })}
        />
      ))}
    </>
  );
};
