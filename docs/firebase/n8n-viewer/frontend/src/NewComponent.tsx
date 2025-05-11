// App.tsx – n8n Cyberpunk Visual Workflow Editor v1.3
// The Handsomest Nerd Inc – Brian (PM), Josh (Design), Reqqy (Requirements), James & Terrell (Dev), Antosh (QA)
// Complete per design, accessibility, gesture, import/export, and neon spec.
// All design tokens in-file, all styling via styled-components. All notes implemented.

import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    KeyboardEvent,
    MouseEvent,
    TouchEvent,
    createContext,
    useContext,
} from "react";
import styled, {
    ThemeProvider,
    createGlobalStyle,
    keyframes,
} from "styled-components";

// ---- FONT INJECTION (Orbitron, Exo, Fira Mono) ----
function injectFonts() {
    if (typeof document !== "undefined") {
        const fonts = [
            {
                id: "orbitron-font",
                href: "https://fonts.googleapis.com/css?family=Orbitron:wght@700;900&display=swap",
            },
            {
                id: "exo-font",
                href: "https://fonts.googleapis.com/css?family=Exo:wght@400;700&display=swap",
            },
            {
                id: "fira-font",
                href: "https://fonts.googleapis.com/css?family=Fira+Mono:wght@400;700&display=swap",
            },
        ];
        for (const f of fonts) {
            if (!document.getElementById(f.id)) {
                const l = document.createElement("link");
                l.id = f.id;
                l.rel = "stylesheet";
                l.href = f.href;
                document.head.appendChild(l);
            }
        }
    }
}
injectFonts();

// ---- DESIGN TOKENS ----
const radius = {
    node: 43,
    canvas: 22,
    popover: 10,
    input: 5,
    btn: 10,
    checkbox: 3,
};
const colors = {
    purple: "#9333EA",
    cyan: "#22D3EE",
    gold: "#EAB308",
    red: "#EF4444",
    emerald: "#22C55E",
    fg: "#F8F9FA",
    dark: "#1A1A1A",
    glassDark: "rgba(26,26,26,0.62)",
    glassLight: "rgba(255,255,255,0.09)",
    offwhite: "#EDF2F7",
};
const themeDark = {
    ...colors,
    bg: colors.dark,
    fg: colors.fg,
    border: colors.purple,
    accent: colors.cyan,
    card: colors.glassDark,
    text: colors.fg,
    popover: "rgba(34,211,238,0.96)",
};
const themeLight = {
    ...colors,
    bg: "#F8F9FA",
    fg: "#1A1A1A",
    border: colors.cyan,
    accent: colors.purple,
    card: "rgba(255,255,255,0.86)",
    text: "#1A1A1A",
    popover: "rgba(147,51,234,0.96)",
};
const edgeDash = keyframes`to { stroke-dashoffset: 26; }`;
const runningSpin = keyframes`100% { transform:rotate(360deg); }`;
// ---- GLOBAL STYLE ----
const GlobalStyle = createGlobalStyle`
  html,body,#root { margin:0;padding:0;height:100%;font-family:'Exo','Arial',sans-serif;background:${(
    p
) => p.theme.bg}; }
  body { -webkit-font-smoothing:antialiased; }
  * { box-sizing: border-box;}
  :focus { outline: 2px solid ${(p) => p.theme.accent}; }
  ::-webkit-scrollbar { width:9px;background:rgba(34,211,238,0.04);}
  ::-webkit-scrollbar-thumb { background:${(p) =>
    p.theme.card}; border-radius:5px; }
`;

type NodeType = {
    id: string;
    name: string;
    type: string;
    position: { x: number; y: number };
    connections: string[];
};
type EdgeType = { from: string; to: string };
type WorkflowType = { nodes: NodeType[] };
type SelectBox = null | { x1: number; y1: number; x2: number; y2: number };

// ---- INITIAL DATA ----
const INITIAL_WORKFLOW: WorkflowType = {
    nodes: [
        {
            id: "start",
            name: "Trigger",
            type: "input",
            position: { x: 220, y: 210 },
            connections: ["action"],
        },
        {
            id: "action",
            name: "Action",
            type: "operation",
            position: { x: 400, y: 350 },
            connections: ["transform"],
        },
        {
            id: "transform",
            name: "Transform",
            type: "operation",
            position: { x: 700, y: 260 },
            connections: [],
        },
    ],
};
function getNode(nodes: NodeType[], id: string | undefined) {
    return nodes.find((n) => n.id === id);
}
function getEdges(nodes: NodeType[]): EdgeType[] {
    let edges: EdgeType[] = [];
    nodes.forEach((n) =>
        n.connections.forEach((cid) => edges.push({ from: n.id, to: cid }))
    );
    return edges;
}

// ---- CONTEXT for APP-WIDE STATE (no prop drilling) ----
type AppContextType = ReturnType<typeof useAppState>;
const AppContext = createContext({} as AppContextType);
function useApp() {
    return useContext(AppContext);
}
// ---- STATE HOOK ----
function useAppState(init: WorkflowType) {
    const [workflow, setWorkflow] = useState<WorkflowType>(init);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [selectBox, setSelectBox] = useState<SelectBox>(null);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [overlayNodeId, setOverlayNodeId] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectFromId, setConnectFromId] = useState<string | null>(null);
    const [connectPreview, setConnectPreview] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [viewBox, setViewBox] = useState<[number, number, number, number]>([
        0, 0, 1200, 680,
    ]);
    const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(
        null
    );
    const [searchOpen, setSearchOpen] = useState(false);
    const [themeDark, setThemeDark] = useState(true);
    // Group drag support
    const [dragStartPositions, setDragStartPositions] = useState<{
        [id: string]: { x: number; y: number };
    } | null>(null);
    return {
        workflow,
        setWorkflow,
        selectedIds,
        setSelectedIds,
        selectBox,
        setSelectBox,
        draggingId,
        setDraggingId,
        dragOffset,
        setDragOffset,
        overlayNodeId,
        setOverlayNodeId,
        isConnecting,
        setIsConnecting,
        connectFromId,
        setConnectFromId,
        connectPreview,
        setConnectPreview,
        isRunning,
        setIsRunning,
        viewBox,
        setViewBox,
        panStart,
        setPanStart,
        searchOpen,
        setSearchOpen,
        themeDark,
        setThemeDark,
        dragStartPositions,
        setDragStartPositions,
    };
}

// ---- MAIN APP ----
const NewComponent: React.FC = () => {
    const state = useAppState(INITIAL_WORKFLOW);
    const theme = state.themeDark ? themeDark : themeLight;
    const svgRef = useRef<SVGSVGElement>(null);

    // ----- PANNING/ZOOM -----
    const doPanStart = (e: MouseEvent | TouchEvent | React.PointerEvent) => {
        e.preventDefault();
        if ("touches" in e) {
            const t = e.touches[0];
            state.setPanStart({ x: t.clientX, y: t.clientY });
        } else {
            state.setPanStart({
                x: (e as React.PointerEvent).clientX,
                y: (e as React.PointerEvent).clientY,
            });
        }
    };
    useEffect(() => {
        if (state.panStart) {
            const startView = [...state.viewBox];
            const start = { ...state.panStart };
            function onMove(e: MouseEvent | TouchEvent) {
                let clientX =
                    "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
                let clientY =
                    "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
                const dx =
                    (start.x - clientX) *
                    (state.viewBox[2] / (svgRef.current?.clientWidth || 1200));
                const dy =
                    (start.y - clientY) *
                    (state.viewBox[3] / (svgRef.current?.clientHeight || 680));
                state.setViewBox([
                    startView[0] + dx,
                    startView[1] + dy,
                    startView[2],
                    startView[3],
                ]);
            }
            function onUp() {
                state.setPanStart(null);
                window.removeEventListener("mousemove", onMove as any);
                window.removeEventListener("touchmove", onMove as any);
                window.removeEventListener("mouseup", onUp);
                window.removeEventListener("touchend", onUp);
            }
            window.addEventListener("mousemove", onMove as any);
            window.addEventListener("touchmove", onMove as any);
            window.addEventListener("mouseup", onUp);
            window.addEventListener("touchend", onUp);
            return () => {
                window.removeEventListener("mousemove", onMove as any);
                window.removeEventListener("touchmove", onMove as any);
                window.removeEventListener("mouseup", onUp);
                window.removeEventListener("touchend", onUp);
            };
        }
    }, [state.panStart, state.viewBox]);

    const onSvgWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        let factor = 1 + (e.deltaY > 0 ? -0.08 : 0.08);
        const [vx, vy, vw, vh] = state.viewBox;
        const svgRect = svgRef.current?.getBoundingClientRect();
        const mx =
            ((e.clientX - (svgRect?.left ?? 0)) / (svgRect?.width ?? 1200)) * vw;
        const my =
            ((e.clientY - (svgRect?.top ?? 0)) / (svgRect?.height ?? 680)) * vh;
        const nw = Math.max(200, Math.min(2400, vw * factor));
        const nh = Math.max(120, Math.min(1350, vh * factor));
        state.setViewBox([
            vx + (vw - nw) * (mx / vw),
            vy + (vh - nh) * (my / vh),
            nw,
            nh,
        ]);
    };

    // ------ KEYBOARD HANDLERS ------
    function onSvgKeyDown(e: KeyboardEvent<SVGSVGElement>) {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
            e.preventDefault();
            if (state.selectedIds.size && !e.shiftKey) {
                // Move group
                const delta = {
                    ArrowLeft: [-12, 0],
                    ArrowRight: [12, 0],
                    ArrowUp: [0, -12],
                    ArrowDown: [0, 12],
                }[e.key]!;
                state.setWorkflow((wf) => ({
                    ...wf,
                    nodes: wf.nodes.map((n) =>
                        state.selectedIds.has(n.id)
                            ? {
                                ...n,
                                position: {
                                    x: n.position.x + delta[0],
                                    y: n.position.y + delta[1],
                                },
                            }
                            : n
                    ),
                }));
            } else {
                let [x, y, w, h] = state.viewBox;
                const d = 32;
                if (e.key === "ArrowLeft") x -= d;
                if (e.key === "ArrowRight") x += d;
                if (e.key === "ArrowUp") y -= d;
                if (e.key === "ArrowDown") y += d;
                state.setViewBox([x, y, w, h]);
            }
        }
        if (e.key === "=" || e.key === "+") {
            e.preventDefault();
            onSvgWheel({ ...e, deltaY: -100 } as any);
        }
        if (e.key === "-") {
            e.preventDefault();
            onSvgWheel({ ...e, deltaY: 100 } as any);
        }
        if (e.key === "Escape") {
            state.setOverlayNodeId(null);
            state.setSelectBox(null);
            state.setDraggingId(null);
        }
    }

    // ----- MARQUEE MULTI-SELECT -----
    const onSvgMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return;
        // If over a node, skip marquee
        if ((e.target as Element).getAttribute("data-nodeid")) return;
        doPanStart(e);
        const svgRect = svgRef.current?.getBoundingClientRect();
        const x =
            ((e.clientX - (svgRect?.left || 0)) / svgRect!.width) * state.viewBox[2] +
            state.viewBox[0];
        const y =
            ((e.clientY - (svgRect?.top || 0)) / svgRect!.height) * state.viewBox[3] +
            state.viewBox[1];
        state.setSelectBox({ x1: x, y1: y, x2: x, y2: y });
        function doMove(me: MouseEvent) {
            const xx =
                ((me.clientX - (svgRect?.left || 0)) / svgRect!.width) *
                state.viewBox[2] +
                state.viewBox[0];
            const yy =
                ((me.clientY - (svgRect?.top || 0)) / svgRect!.height) *
                state.viewBox[3] +
                state.viewBox[1];
            state.setSelectBox((sel) => (sel ? { ...sel, x2: xx, y2: yy } : null));
        }
        function doUp() {
            if (state.selectBox) {
                const { x1, y1, x2, y2 } = state.selectBox;
                const bx = [Math.min(x1, x2), Math.max(x1, x2)];
                const by = [Math.min(y1, y2), Math.max(y1, y2)];
                const selected = new Set(
                    state.workflow.nodes
                        .filter(
                            (n) =>
                                n.position.x >= bx[0] - radius.node &&
                                n.position.x <= bx[1] + radius.node &&
                                n.position.y >= by[0] - radius.node &&
                                n.position.y <= by[1] + radius.node
                        )
                        .map((n) => n.id)
                );
                state.setSelectedIds(selected);
            }
            state.setSelectBox(null);
            window.removeEventListener("mousemove", doMove);
            window.removeEventListener("mouseup", doUp);
        }
        window.addEventListener("mousemove", doMove);
        window.addEventListener("mouseup", doUp);
    };

    // ------ NODE DRAGGING (GROUP OR SINGLE) --------
    const onNodePointerDown = (nid: string, e: React.PointerEvent) => {
        e.preventDefault();
        if ((e.shiftKey || e.metaKey) && state.selectedIds.size > 0) {
            state.setSelectedIds((ids) => {
                const copy = new Set(ids);
                copy.has(nid) ? copy.delete(nid) : copy.add(nid);
                return copy;
            });
        } else {
            if (!state.selectedIds.has(nid)) state.setSelectedIds(new Set([nid]));
        }
        const svgRect = svgRef.current!.getBoundingClientRect();
        const x =
            ((e.clientX - (svgRect?.left || 0)) / svgRect!.width) * state.viewBox[2] +
            state.viewBox[0];
        const y =
            ((e.clientY - (svgRect?.top || 0)) / svgRect!.height) * state.viewBox[3] +
            state.viewBox[1];
        const node = state.workflow.nodes.find((n) => n.id === nid)!;
        state.setDragOffset({ x: x - node.position.x, y: y - node.position.y });
        state.setDraggingId(nid);
        // Group drag support
        const selectedForDrag = Array.from(
            state.selectedIds.size === 0 ? [nid] : state.selectedIds
        );
        const initPositions: { [id: string]: { x: number; y: number } } = {};
        state.workflow.nodes.forEach((n) => {
            if (selectedForDrag.includes(n.id))
                initPositions[n.id] = { ...n.position };
        });
        state.setDragStartPositions(initPositions);
        function onMove(ev: PointerEvent) {
            const xx =
                ((ev.clientX - (svgRect?.left || 0)) / svgRect!.width) *
                state.viewBox[2] +
                state.viewBox[0];
            const yy =
                ((ev.clientY - (svgRect?.top || 0)) / svgRect!.height) *
                state.viewBox[3] +
                state.viewBox[1];
            const dx = xx - node.position.x - state.dragOffset.x;
            const dy = yy - node.position.y - state.dragOffset.y;
            state.setWorkflow((wf) => {
                const dragGroup =
                    state.selectedIds.size === 0 ? [nid] : Array.from(state.selectedIds);
                return {
                    ...wf,
                    nodes: wf.nodes.map((n) => {
                        if (dragGroup.includes(n.id)) {
                            const orig = (state.dragStartPositions || {})[n.id] || n.position;
                            return { ...n, position: { x: orig.x + dx, y: orig.y + dy } };
                        }
                        return n;
                    }),
                };
            });
        }
        function onUp() {
            state.setDraggingId(null);
            state.setDragStartPositions(null);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        }
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
    };

    // ------ CONNECTION HANDLE (START/END CONNECTION) --------
    const onConnHandleDown = (nid: string, e: React.PointerEvent) => {
        e.stopPropagation();
        e.preventDefault();
        state.setIsConnecting(true);
        state.setConnectFromId(nid);
        function onMove(ev: PointerEvent) {
            const svgRect = svgRef.current!.getBoundingClientRect();
            const xx =
                ((ev.clientX - (svgRect?.left || 0)) / svgRect!.width) *
                state.viewBox[2] +
                state.viewBox[0];
            const yy =
                ((ev.clientY - (svgRect?.top || 0)) / svgRect!.height) *
                state.viewBox[3] +
                state.viewBox[1];
            state.setConnectPreview({ x: xx, y: yy });
        }
        function onUp(ev: PointerEvent) {
            if (state.connectFromId) {
                const svgRect = svgRef.current!.getBoundingClientRect();
                const xx =
                    ((ev.clientX - (svgRect?.left || 0)) / svgRect!.width) *
                    state.viewBox[2] +
                    state.viewBox[0];
                const yy =
                    ((ev.clientY - (svgRect?.top || 0)) / svgRect!.height) *
                    state.viewBox[3] +
                    state.viewBox[1];
                state.workflow.nodes.forEach((n) => {
                    const dist = Math.hypot(n.position.x - xx, n.position.y - yy);
                    if (dist < radius.node + 12 && n.id !== state.connectFromId) {
                        state.setWorkflow((wf) => ({
                            ...wf,
                            nodes: wf.nodes.map((nn) =>
                                nn.id === state.connectFromId && !nn.connections.includes(n.id)
                                    ? { ...nn, connections: [...nn.connections, n.id] }
                                    : nn
                            ),
                        }));
                    }
                });
            }
            state.setConnectFromId(null);
            state.setIsConnecting(false);
            state.setConnectPreview(null);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        }
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
    };

    // ------- OVERLAY/POPOVER ----------
    function onNodeHover(nid: string) {
        state.setOverlayNodeId(nid);
    }
    function onNodeHoverOut(nid: string) {
        if (state.overlayNodeId === nid) state.setOverlayNodeId(null);
    }
    function onNodeClick(nid: string, e: React.MouseEvent) {
        e.preventDefault();
        state.setSelectedIds(new Set([nid]));
        state.setOverlayNodeId(nid);
    }

    // -------- TOOLBAR / EXPORT --------
    function toggleTheme() {
        state.setThemeDark((d) => !d);
    }
    function resetView() {
        state.setViewBox([0, 0, 1200, 680]);
    }
    function toggleRun() {
        state.setIsRunning((r) => !r);
    }
    function onExportSVG() {
        const svg = svgRef.current;
        if (svg) {
            const cloned = svg.cloneNode(true) as SVGSVGElement;
            const desc = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "desc"
            );
            desc.textContent =
                "Exported workflow SVG, design tokens and details for QA/dev only.";
            cloned.insertBefore(desc, cloned.firstChild);
            const s = new XMLSerializer().serializeToString(cloned);
            const blob = new Blob([s], { type: "image/svg+xml" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "workflow-export.svg";
            a.click();
        }
    }
    function onExportCSV() {
        const rows = [
            ["id", "name", "type", "x", "y", "connections"],
            ...state.workflow.nodes.map((n) => [
                n.id,
                n.name,
                n.type,
                Math.round(n.position.x),
                Math.round(n.position.y),
                n.connections.join("|"),
            ]),
        ];
        const csv = rows.map((r) => r.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "workflow.csv";
        a.click();
    }
    function onImportCSV(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const lines = (evt.target!.result as string)
                    .split(/\r?\n/)
                    .filter(Boolean);
                const [hdr, ...rows] = lines;
                const idx: { [k: string]: number } = {};
                hdr.split(",").forEach((h, i) => (idx[h] = i));
                const nodes: NodeType[] = rows.map((row) => {
                    const cols = row.split(",");
                    return {
                        id: cols[idx.id],
                        name: cols[idx.name],
                        type: cols[idx.type],
                        position: { x: +cols[idx.x], y: +cols[idx.y] },
                        connections: cols[idx.connections]
                            ? cols[idx.connections].split("|").filter(Boolean)
                            : [],
                    };
                });
                if (!nodes.length || nodes.some((n) => !n.id || !n.name))
                    throw new Error("Invalid node rows");
                state.setWorkflow({ nodes });
            } catch (ex: any) {
                alert("CSV import failed: " + ex?.message);
            }
        };
        reader.readAsText(file);
    }

    // ----- RENDER -----
    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider value={state}>
                <GlobalStyle />
                <AppShell tabIndex={-1} aria-label="n8n Cyberpunk Workflow Editor">
                    {/* ===== TOOLBAR ===== */}
                    <Toolbar role="toolbar" aria-label="App toolbar">
                        <Brand aria-label="App logo" tabIndex={0}>
                            <BrandText>n8nFlow</BrandText>
                        </Brand>
                        <ToolbarSearch>
                            <SearchInput
                                aria-label="Search workflows"
                                placeholder="Search workflows…"
                            />
                            <SearchHint>
                                <kbd>⌘K</kbd>
                            </SearchHint>
                        </ToolbarSearch>
                        <ToolbarBtnArea>
                            <ToolbarThemeToggle
                                aria-label="Toggle dark/light theme"
                                role="switch"
                                aria-checked={state.themeDark}
                                tabIndex={0}
                                onClick={toggleTheme}
                                $active={state.themeDark}
                            >
                                {state.themeDark ? <MoonIcon /> : <SunIcon />}
                            </ToolbarThemeToggle>
                            <ToolbarIconBtn
                                aria-label="Run/Stop workflow"
                                onClick={toggleRun}
                            >
                                {state.isRunning ? <RunningDot /> : <PlayIcon />}
                            </ToolbarIconBtn>
                            <ToolbarIconBtn aria-label="Export SVG" onClick={onExportSVG}>
                                <ExportIcon />
                            </ToolbarIconBtn>
                            <ToolbarIconBtn aria-label="Export CSV" onClick={onExportCSV}>
                                <ExportCsvIcon />
                            </ToolbarIconBtn>
                            <ToolbarIconBtn as="label" title="Import CSV" tabIndex={0}>
                                <ImportIcon />
                                <input
                                    type="file"
                                    accept=".csv"
                                    style={{ display: "none" }}
                                    onChange={onImportCSV}
                                />
                            </ToolbarIconBtn>
                            <ToolbarIconBtn aria-label="Reset view" onClick={resetView}>
                                <ResetIcon />
                            </ToolbarIconBtn>
                        </ToolbarBtnArea>
                    </Toolbar>
                    {/* ===== CANVAS ===== */}
                    <CanvasWrapper>
                        <svg
                            ref={svgRef}
                            viewBox={state.viewBox.join(" ")}
                            width="100%"
                            height="100%"
                            focusable
                            aria-label="SVG Workflow Canvas"
                            tabIndex={0}
                            role="region"
                            onWheel={onSvgWheel}
                            onMouseDown={onSvgMouseDown}
                            onKeyDown={onSvgKeyDown}
                            aria-describedby="canvasDesc"
                            style={{ display: "block", background: theme.card }}
                        >
                            <desc id="canvasDesc">
                                Neon glass SVG canvas. Supports pan/zoom/group select. Nodes are
                                circular, with neon edge and glass fill. Hover/click for popover
                                overlays. Can marquee nodes.
                            </desc>
                            {/* Canvas Neon Border */}
                            <rect
                                x={40}
                                y={80}
                                width={1120}
                                height={500}
                                rx={radius.canvas}
                                fill={theme.card}
                                stroke={theme.border}
                                strokeWidth={3}
                                style={{ filter: `drop-shadow(0 0 22px ${theme.border})` }}
                            />
                            {/* Marquee Selection Box */}
                            {state.selectBox && (
                                <rect
                                    x={Math.min(state.selectBox.x1, state.selectBox.x2)}
                                    y={Math.min(state.selectBox.y1, state.selectBox.y2)}
                                    width={Math.abs(state.selectBox.x2 - state.selectBox.x1)}
                                    height={Math.abs(state.selectBox.y2 - state.selectBox.y1)}
                                    rx={radius.popover}
                                    fill="none"
                                    stroke={theme.accent}
                                    strokeDasharray="13 8"
                                    strokeWidth={3}
                                    style={{ filter: `drop-shadow(0 0 24px ${theme.accent})` }}
                                />
                            )}
                            {/* Workflow Edges */}
                            {getEdges(state.workflow.nodes).map((e, ei) => {
                                const from = getNode(state.workflow.nodes, e.from);
                                const to = getNode(state.workflow.nodes, e.to);
                                if (!from || !to) return null;
                                const x1 = from.position.x + radius.node,
                                    y1 = from.position.y;
                                const x2 = to.position.x - radius.node,
                                    y2 = to.position.y;
                                const c1x = x1 + 60,
                                    c2x = x2 - 60;
                                const id = `edge-${from.id}-${to.id}`;
                                return (
                                    <path
                                        key={id}
                                        d={`M${x1},${y1} C${c1x},${y1} ${c2x},${y2} ${x2},${y2}`}
                                        stroke={theme.accent}
                                        strokeWidth={4.2}
                                        fill="none"
                                        aria-label={`Connect: ${from.name} to ${to.name}`}
                                        tabIndex={0}
                                        strokeDasharray="16 10"
                                        style={{
                                            filter: `drop-shadow(0 0 8px ${theme.accent})`,
                                            animation: state.isRunning
                                                ? `${edgeDash} 1s linear infinite`
                                                : undefined,
                                        }}
                                    />
                                );
                            })}
                            {/* Preview connection while connecting */}
                            {state.isConnecting &&
                                state.connectFromId &&
                                state.connectPreview &&
                                (() => {
                                    const node = getNode(
                                        state.workflow.nodes,
                                        state.connectFromId
                                    )!;
                                    const x1 = node.position.x + radius.node,
                                        y1 = node.position.y;
                                    const { x: x2, y: y2 } = state.connectPreview;
                                    return (
                                        <path
                                            d={`M${x1},${y1} C${x1 + 60},${y1} ${
                                                x2 - 60
                                            },${y2} ${x2},${y2}`}
                                            stroke={theme.border}
                                            strokeWidth={3.2}
                                            fill="none"
                                            strokeDasharray="14 6"
                                            style={{ filter: `drop-shadow(0 0 8px ${theme.border})` }}
                                        />
                                    );
                                })()}
                            {/* Nodes */}
                            {state.workflow.nodes.map((n) => (
                                <g
                                    key={n.id}
                                    aria-label={`Node: ${n.name}`}
                                    tabIndex={0}
                                    role="button"
                                    data-nodeid={n.id}
                                    transform={`translate(${n.position.x},${n.position.y})`}
                                    onPointerDown={(e) => onNodePointerDown(n.id, e)}
                                    onMouseOver={() => onNodeHover(n.id)}
                                    onMouseOut={() => onNodeHoverOut(n.id)}
                                    onClick={(e) => onNodeClick(n.id, e)}
                                    style={{
                                        cursor: state.draggingId === n.id ? "grabbing" : "pointer",
                                        zIndex: 2,
                                    }}
                                >
                                    <circle
                                        r={radius.node}
                                        fill={
                                            n.type === "input"
                                                ? theme.border
                                                : n.type === "operation"
                                                    ? theme.accent
                                                    : theme.gold
                                        }
                                        stroke={theme.fg}
                                        strokeWidth={3.2}
                                        style={{
                                            filter: `drop-shadow(0 0 22px ${
                                                state.selectedIds.has(n.id) ? theme.gold : theme.border
                                            })`,
                                        }}
                                        aria-describedby={`nodeDesc-${n.id}`}
                                    />
                                    <text
                                        y={6}
                                        textAnchor="middle"
                                        fontFamily="'Orbitron',sans-serif"
                                        fontWeight="bold"
                                        fontSize={18}
                                        fill={theme.text}
                                        pointerEvents="none"
                                    >
                                        {n.name}
                                    </text>
                                    <g
                                        aria-label="Connect handle"
                                        tabIndex={0}
                                        role="button"
                                        onPointerDown={(e) => onConnHandleDown(n.id, e)}
                                        style={{ pointerEvents: "auto" }}
                                    >
                                        <circle
                                            cx={radius.node + 13}
                                            cy={0}
                                            r={
                                                state.isConnecting && state.connectFromId === n.id
                                                    ? 15
                                                    : 10
                                            }
                                            fill={theme.accent}
                                            stroke={theme.fg}
                                            strokeWidth={2}
                                            style={{
                                                filter: `drop-shadow(0 0 11px ${theme.accent})`,
                                                cursor: "pointer",
                                            }}
                                            aria-describedby={`handleDesc-${n.id}`}
                                        />
                                    </g>
                                    {state.selectedIds.has(n.id) && (
                                        <circle
                                            r={radius.node + 9}
                                            fill="none"
                                            stroke={theme.accent}
                                            strokeDasharray="8 4"
                                            strokeWidth={3}
                                            style={{
                                                filter: `drop-shadow(0 0 13px ${theme.accent})`,
                                            }}
                                        />
                                    )}
                                    {/* Overlay/Popover (Hover/click, above node) */}
                                    {state.overlayNodeId === n.id && (
                                        <g
                                            tabIndex={0}
                                            role="dialog"
                                            aria-label={`Node detail for ${n.name}`}
                                            style={{ pointerEvents: "auto" }}
                                        >
                                            <rect
                                                x={28}
                                                y={-74}
                                                width={154}
                                                height={77}
                                                rx="14"
                                                fill={theme.popover}
                                                stroke={theme.border}
                                                strokeWidth="2.2"
                                                style={{
                                                    filter: `drop-shadow(0 0 21px ${theme.accent})`,
                                                    opacity: 0.97,
                                                    zIndex: 12,
                                                }}
                                            />
                                            <text
                                                x={105}
                                                y={-54}
                                                fontFamily="'Orbitron',sans-serif"
                                                fontSize={16}
                                                fill={theme.text}
                                                fontWeight="bold"
                                            >
                                                {n.name}
                                            </text>
                                            <text
                                                x={35}
                                                y={-35}
                                                fontFamily="'Fira Mono',monospace"
                                                fontSize={12}
                                                fill={theme.text}
                                            >{`Type: ${n.type}`}</text>
                                            <text
                                                x={35}
                                                y={-20}
                                                fontFamily="'Fira Mono',monospace"
                                                fontSize={12}
                                                fill={theme.text}
                                            >{`Connections: ${n.connections.length || 0}`}</text>
                                            <text
                                                x={35}
                                                y={-5}
                                                fontFamily="'Fira Mono',monospace"
                                                fontSize={12}
                                                fill={theme.text}
                                            >
                                                ID: {n.id}
                                            </text>
                                        </g>
                                    )}
                                    <desc id={`nodeDesc-${n.id}`}>
                                        Neon node, orbitron label, connection handle at east edge
                                    </desc>
                                </g>
                            ))}
                        </svg>
                    </CanvasWrapper>
                    {/* ===== FOOTER ===== */}
                    <Footer aria-label="App Footer">
                        <FooterBrand>The Handsomest Nerd Inc</FooterBrand>
                        <FooterRight>v1.3.0 &copy; 2024</FooterRight>
                    </Footer>
                </AppShell>
            </AppContext.Provider>
        </ThemeProvider>
    );
};

// ---- ICONS ----
function MoonIcon() {
    return (
        <svg width="23" height="23" viewBox="0 0 38 38" fill="none">
            <path
                d="M23 21a8 8 0 1 1-6-13"
                stroke="#F8F9FA"
                strokeWidth={2}
                fill="none"
            />
        </svg>
    );
}
function SunIcon() {
    return (
        <svg width="23" height="23" viewBox="0 0 38 38" fill="none">
            <circle
                cx="19"
                cy="19"
                r="7"
                stroke="#1A1A1A"
                strokeWidth={2}
                fill="#F8F9FA"
            />
            <g stroke="#F8F9FA" strokeWidth={2}>
                <line x1="19" y1="1" x2="19" y2="6" />
                <line x1="19" y1="32" x2="19" y2="37" />
                <line x1="1" y1="19" x2="6" y2="19" />
                <line x1="32" y1="19" x2="37" y2="19" />
                <line x1="7" y1="7" x2="11" y2="11" />
                <line x1="27" y1="27" x2="31" y2="31" />
                <line x1="7" y1="31" x2="11" y2="27" />
                <line x1="27" y1="11" x2="31" y2="7" />
            </g>
        </svg>
    );
}
function PlayIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 20 20">
            <polygon points="4,2 18,10 4,18" fill="#22D3EE" />
        </svg>
    );
}
function RunningDot() {
    return (
        <span
            style={{
                width: 20,
                height: 20,
                display: "inline-block",
                verticalAlign: "middle",
                background: "#22C55E",
                borderRadius: "50%",
                animation: `${runningSpin} 1.1s linear infinite`,
            }}
        />
    );
}
function ExportIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M12 19V5" stroke="#9333EA" strokeWidth={2} />
            <path d="M7 10l5-5 5 5" stroke="#9333EA" strokeWidth={2} fill="none" />
        </svg>
    );
}
function ExportCsvIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 20 20">
            <rect
                x="4"
                y="4"
                width="12"
                height="12"
                fill="none"
                stroke="#9333EA"
                strokeWidth={2}
            />
            <path d="M8 7h4v6H8V7z" fill="#22D3EE" />
            <path d="M6 18h8" stroke="#22D3EE" strokeWidth={1.5} />
        </svg>
    );
}
function ImportIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M12 19V5" stroke="#22D3EE" strokeWidth={2} />
            <path d="M7 14l5 5 5-5" stroke="#22D3EE" strokeWidth={2} fill="none" />
        </svg>
    );
}
function ResetIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24">
            <path
                d="M12 5V1m0 0C6.477 1 2 5.477 2 11c0 5.523 4.477 10 10 10s10-4.477 10-10"
                stroke="#EAB308"
                strokeWidth={2}
            />
            <path d="M8 1l4-4 4 4" stroke="#EAB308" strokeWidth={2} fill="none" />
        </svg>
    );
}

// ---- STYLED COMPONENTS ----
const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${(p) => p.theme.bg};
  transition: background 220ms;
`;
const Toolbar = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 24px 0 28px;
  gap: 28px;
  border-bottom: 2.2px solid ${(p) => p.theme.card};
  background: linear-gradient(
    90deg,
    ${(p) => p.theme.bg} 85%,
    ${(p) => p.theme.card} 100%
  );
  box-shadow: 0 1.5px 17px 0 ${(p) => p.theme.border}16;
  z-index: 10;
  position: sticky;
  top: 0;
`;
const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
  font-size: 21px;
  color: ${(p) => p.theme.border};
  text-shadow: 0 0 18px ${(p) => p.theme.border};
  user-select: none;
  letter-spacing: 2px;
  min-width: 112px;
`;
const BrandText = styled.span`
  font-size: 29px;
  font-family: "Orbitron", sans-serif;
  color: ${(p) => p.theme.border};
`;
const ToolbarSearch = styled.div`
  position: relative;
  width: 218px;
  display: flex;
  align-items: center;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 32px;
  border-radius: 5px;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  padding: 0 14px;
  font-size: 15px;
  font-family: "Exo", sans-serif;
  color: ${(p) => p.theme.text};
  box-shadow: 0 0 12px ${(p) => p.theme.accent}13;
  &:focus {
    outline: 2.2px solid ${(p) => p.theme.accent};
  }
  &::placeholder {
    color: ${(p) => p.theme.offwhite};
    opacity: 0.67;
  }
`;
const SearchHint = styled.div`
  position: absolute;
  right: 8px;
  top: 5px;
  background: rgba(34, 211, 238, 0.19);
  border-radius: 6px;
  padding: 0 7px;
  font-size: 12px;
  color: ${(p) => p.theme.accent};
  font-family: "Fira Mono", monospace;
  line-height: 20px;
  pointer-events: none;
`;
const ToolbarBtnArea = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-left: auto;
`;
const ToolbarIconBtn = styled.button`
  width: 34px;
  height: 32px;
  border-radius: 10px;
  border: 1.2px solid ${(p) => p.theme.card};
  background: rgba(255, 255, 255, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 8px ${(p) => p.theme.border}36;
  transition: 0.18s box-shadow, 0.18s border, 0.19s filter;
  filter: drop-shadow(0 0 0px ${(p) => p.theme.accent});
  &:hover,
  &:focus {
    filter: drop-shadow(0 0 8px ${(p) => p.theme.accent});
    border-color: ${(p) => p.theme.accent};
  }
  &:active {
    filter: drop-shadow(0 0 13px ${(p) => p.theme.gold});
  }
  svg {
    display: block;
  }
`;
const ToolbarThemeToggle = styled(ToolbarIconBtn)<{ $active: boolean }>`
  border: 1.3px solid ${(p) => (p.$active ? p.theme.border : p.theme.accent)};
  background: rgba(255, 255, 255, 0.16);
  width: 55px;
  transition: background 0.17s;
  svg {
    margin: auto;
  }
`;
const CanvasWrapper = styled.section`
  flex: 1;
  display: flex;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  background: linear-gradient(
    120deg,
    ${(p) => p.theme.card} 89%,
    ${(p) => p.theme.bg} 100%
  );
  padding: 0 0;
`;
const Footer = styled.footer`
  height: 60px;
  background: rgba(255, 255, 255, 0.09);
  border-top: 3px solid ${(p) => p.theme.accent};
  border-radius: 0 0 12px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 39px;
  box-shadow: 0 0 12px ${(p) => p.theme.accent}36;
  position: relative;
  z-index: 10;
  font-family: "Exo", sans-serif;
  font-size: 17px;
`;
const FooterBrand = styled.span`
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: ${(p) => p.theme.border};
  text-shadow: 0 0 13px ${(p) => p.theme.border};
`;
const FooterRight = styled.span`
  color: ${(p) => p.theme.fg};
  opacity: 0.75;
  font-size: 16px;
  font-family: "Exo", sans-serif;
`;

// ---- END APP ----
export default NewComponent;
