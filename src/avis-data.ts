import { z } from "zod";

export const avisSchema = z.object({
  auteur: z.string(),
  contexte: z.string(),
  note: z.number().min(1).max(5),
  citation: z.string(),
  periode: z.string(),
});

export type Avis = z.infer<typeof avisSchema>;

/**
 * Les 5 avis Google de Ponti'Com (5,0 / 5).
 *
 * ⚠️ Trois citations sont TRONQUÉES : Google les coupait avec « … Plus » dans
 * la source. Le texte complet doit être récupéré sur la fiche pour éviter de
 * publier une phrase incomplète. Voir `citationComplete: false`.
 */
export const AVIS: (Avis & { citationComplete: boolean })[] = [
  {
    auteur: "Axel Allen",
    contexte: "Site sur mesure",
    note: 5,
    citation:
      "En plus de m'avoir fait un site sur mesure, j'ai beaucoup appris de notre collaboration, notamment sur le fonctionnement d'un site web. La création de site internet est un art que Ponti'Com maîtrise.",
    periode: "Mars 2026",
    citationComplete: true,
  },
  {
    auteur: "Ultra Marine",
    contexte: "Cabinet de recrutement",
    note: 5,
    citation:
      "Notre cabinet de recrutement a fait appel à Ponti'Com pour la création de son site internet, et nous sommes pleinement satisfaits du travail réalisé.",
    periode: "Juin 2026",
    citationComplete: false,
  },
  {
    auteur: "Christelle Giner",
    contexte: "Création de site & outils numériques",
    note: 5,
    citation:
      "Je recommande vivement Ponti'Com pour la création de site internet et le développement des outils numériques au profit de ma société.",
    periode: "Mai 2026",
    citationComplete: false,
  },
  {
    auteur: "Amazon'Conciergerie",
    contexte: "Conciergerie",
    note: 5,
    citation: "À l'écoute, efficace et réactif.",
    periode: "Mars 2026",
    citationComplete: false,
  },
  {
    // Avis sans texte : la note seule. Le composant bascule sur une mise en
    // page « note » quand `citation` est vide.
    auteur: "Samia Moreau",
    contexte: "Cliente",
    note: 5,
    citation: "",
    periode: "Mars 2026",
    citationComplete: true,
  },
];

/** Identifiant de composition à partir du nom, pour le rendu en lot. */
export const idDepuisAuteur = (auteur: string) =>
  "Avis-" +
  auteur
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
