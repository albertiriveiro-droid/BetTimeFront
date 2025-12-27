import type { MarketType } from "../types/market";
import type { PlayerMarketType } from "../types/playerMarket";
import type { Market } from "../types/market";
import type { MarketSelection } from "../types/marketSelection";
import type { MatchOutputDTO } from "../types/match";

export const formatMarketType = (type: MarketType) => {
  switch (type) {
    case "OneXTwo":
      return "1X2";
    case "OverUnderGoals":
      return "Total de goles";
    case "TotalCorners":
      return "Total de córners";
    case "BothToScore":
      return "Ambos marcan";
    default:
      return type;
  }
};

export const formatPlayerMarketType = (type: PlayerMarketType) => {
  switch (type) {
    case "Goal":
      return "Anotará";
    case "Assist":
      return "Dará asistencia";
    case "YellowCard":
      return "Recibirá tarjeta";
    case "RedCard":
      return "Será expulsado";
    default:
      return type;
  }
};

export const formatSelectionName = (selection: {
  name: string;
  threshold?: number;
}) => {
  if (selection.threshold !== undefined) {
    return `${selection.name} ${selection.threshold}`;
  }
  return selection.name;
};

export const formatSelectionWithMatch = (
  market: Market,
  selection: MarketSelection,
  match: MatchOutputDTO
) => {
  switch (market.marketType) {
    case "OneXTwo":
      if (selection.name === "Home") return match.homeTeamName;
      if (selection.name === "Away") return match.awayTeamName;
      if (selection.name === "Draw") return "Empate";
      return "";

    case "BothToScore":
      if (selection.name === "Yes") return "Sí";
      if (selection.name === "No") return "No";
      return "";

    case "OverUnderGoals":
    case "TotalCorners":
      return `${selection.name} ${selection.threshold}`;

    default:
      return selection.name;
  }
};
