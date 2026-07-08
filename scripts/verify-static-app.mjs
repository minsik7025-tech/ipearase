import { readFileSync, statSync } from "node:fs";

const gamePath = "사라진지우개찾기_배포용.html";
const game = readFileSync(gamePath, "utf8");
const index = readFileSync("index.html", "utf8");

const requiredSnippets = [
  'databaseURL:"https://earser-default-rtdb.asia-southeast1.firebasedatabase.app"',
  'apiKey:"AIzaSyAlaqZiIHHa6m7iAA_mvD21XIhJUxGdAqQ"',
  "https://earser2-default-rtdb.asia-southeast1.firebasedatabase.app",
  "https://earser3-da9c7-default-rtdb.asia-southeast1.firebasedatabase.app",
  "serverList",
  "selectedServerId",
  "startServerLoadTimer",
  "SERVER_SOFT_LIMIT",
  "showFullServerNotice",
  "기다리거나",
  "The_Chameleon_Strategy.mp3",
  "playWhistleFromPosition",
  "sendWhistle",
  "maybeAIWhistle",
  "nearestSeekerDistanceFrom",
  "aiWhistleNext",
  "rooms/${this.code}/whistles",
  "KeyH",
  "H 휘파람",
  "Audio2.resume();",
  "화면을 한 번 클릭하면 휘파람 소리가 켜져요",
  "캐릭터 위는 칠하기 · 배경은 돌리기",
  "mirrorDrag=\"paint\"",
  "mirrorDrag=\"orbit\"",
  "pcLookDrag",
  "20dvh",
  "env(safe-area-inset-bottom)",
  "aiCountSelect",
  "syncAIBotsForLobby",
  "runAIHostTick",
  "AI_NAMES",
  "isAIUid",
  "makeAICamoDataUrl",
  "AI_HIDE_SPOTS",
  "AI_PATROL_POINTS",
  "aiChooseHideSpot",
  "aiRankHideSpots",
  "planAIHideTargets",
  "separationPenalty",
  "aiHideSpotScore",
  "aiMemoryScoreNear",
  "recordRoundLearning",
  "loadAIMemory",
  "aiMemory/${mapKind}",
  "phaseStartedAt",
  "blocked?34:-24",
  "aiCanSpotTarget",
  "aiEyePoint",
  "aiTargetPoint",
  "aiTargetMetrics",
  "aiCanTagTarget",
  "AI_HIGH_TAG_HORIZONTAL",
  "AI_TAG_3D_RANGE",
  "setMirror(true);",
  "G.role===\"seeker\"&&G.phase===\"SEEK\"&&!seekerDragMoved",
  "hostRoleSelect",
  "updateHostRole",
  "effectiveOwnPlayer",
  "spectatorSeekerSummary",
  "hiderTeammateSummary",
  "describeMapPosition",
  "reapplyRemotePositions",
  "lerpAngle",
  "resolvePlayerStuck",
  "playerOverlapsCollider",
  "this.positions[s.key])this.applyPos",
  "G.role===\"hider\"&&r.info.role===\"hider\"&&!r.info.found",
  "setInterval(()=>{ if(G.screen===\"TITLE\")refreshServerLoads(); },15000)",
  "searchParams.set(\"server\",selectedServerId)",
  "혼잡",
  "여유",
  'await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js")',
  'await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js")',
  "rooms/${code}/meta",
  "rooms/${this.code}/players",
  "rooms/${this.code}/pos",
  "rooms/${this.code}/presence",
  "QR이나 링크를 열면 이 방으로 바로 연결됩니다",
  "열린 게임방",
  "openRoomList",
  "watchOpenRooms",
  "leaveRoom",
  "btnPanelSpoit",
  "mapSelect",
  "mapKind",
  "buildPlaygroundMap",
  "buildGymMap",
  "buildMusicRoomMap",
  "updateRoomMap",
  "practiceMapSelect",
  "er_practice_map",
  "if(G.lobbyPractice)returnFromLobbyPractice(); else Net.leaveRoom();",
  "top:216px;right:12px",
  "튼튼한 몸  밝은 마음",
  "label:\"무대\"",
  "rebuildMap(\"classroom\")",
  "JUDGE_AIM_RADIUS",
  "_judgeClosest",
  "addPaintSplat",
  "updatePaintSplats",
  "SEEKER_PAINT_COLORS"
];

for (const snippet of requiredSnippets) {
  if (!game.includes(snippet)) {
    throw new Error(`Missing expected game snippet: ${snippet}`);
  }
}

const removedSnippets = [
  'id="btnJoinOpen"',
  'id="joinBox"',
  'id="codeInput"',
  'id="btnJoin"',
  "코드로 입장"
  ,"hostSeekerChk"
  ,"hostSeekerWrap"
  ,"nearestWhistleTarget"
  ,"updateWhistleCue"
];
for (const snippet of removedSnippets) {
  if (game.includes(snippet)) {
    throw new Error(`Removed code-entry snippet is still present: ${snippet}`);
  }
}

if (!index.includes("사라진지우개찾기_배포용.html")) {
  throw new Error("index.html must redirect to the game HTML file.");
}

if (statSync(gamePath).size < 100_000) {
  throw new Error("Game HTML looks unexpectedly small.");
}

const moduleMatch = game.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!moduleMatch) {
  throw new Error("Game HTML must include a module script.");
}

const syntaxProbe = moduleMatch[1].replace(/^\s*import\s+\*\s+as\s+THREE\s+from\s+['"]three['"];\s*/m, "");
new Function(syntaxProbe);

console.log("Static app verification passed.");
