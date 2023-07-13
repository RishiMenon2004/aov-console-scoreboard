import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  fixtures_day_1: defineTable({
    team1_id: v.string(),
    team2_id: v.string(),
    time: v.string(),
  }),
  participating_clubs: defineTable({
    id: v.string(),
    losses: v.float64(),
    out: v.boolean(),
    points: v.float64(),
    wins: v.float64(),
  }),
});