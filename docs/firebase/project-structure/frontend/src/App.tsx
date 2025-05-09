import React, {useMemo, useState,} from "react";
import {GlobalStyles} from "./styles/globalStyles";
import {AgentKey, Step} from "./types/App.types";
import {HeaderBar, HeaderIcon, LiveRegion, MainPanelLayout, RootLayout, Sidebar} from "./styles/App.styled";
import {Agents} from "./data/Agents";
import {Steps} from "./data/steps";


function getAgentColor(agent: AgentKey) {
    return Agents[agent].color;
}


/**
 * =========================
 * APP IMPLEMENTATION ("LIVING APP")
 * =========================
 */
type ViewState = 'workflow' | 'library' | 'other';
let setCurrentView: (view: ViewState) => void;
export default function App() {
    // UI state
    const [currentView, setCurrentView] = useState<"workflow" | "promptLibrary">("workflow");

    const [agentFilter, setAgentFilter] = useState<null | AgentKey>(null);
    const [globalCopied, setGlobalCopied] = useState<boolean>()

    // Table filtered based on agent selection in sidebar
    const steps = useMemo(
        () =>
            agentFilter ? Steps.filter((s: Step) => s.assigned === agentFilter) : Steps,
        [agentFilter]
    );
    // The canonical step as per id


    // ARIA live feedback
    const [ariaStatus, setAriaStatus] = useState("");

    // Copy handlers: JSON global/step (preserving feedback and ARIA cues)
    function handleGlobalCopy() {
        navigator.clipboard.writeText(JSON.stringify(Steps, null, 2));
        setGlobalCopied(true);
        setTimeout(() => setGlobalCopied(false), 1100);
        setAriaStatus("Copied global workflow JSON.");
    }


    // Simple static chat modeling a workflow conversation (could be replaced with live)
    const [chatInput, setChatInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    function sendChatMessage() {
        if (chatInput.trim().length > 0) {
            setChatHistory([
                ...chatHistory,
                {
                    id: chatHistory.length + 1,
                    content: chatInput,
                    agent: "Man-Man",
                    you: true,
                },
            ]);
            setChatInput("");
        }
    }

    const AppHeader = () => {
        return <HeaderBar role="banner" aria-label="Header">
            <HeaderIcon/>
            AI Agent Workflow Orchestrator v3.9.5
            {currentView === "workflow" && (
                <>UI header here</>
            )}
        </HeaderBar>
    }

    return (
        <div style={{width: "100vw", height: "100vh", boxSizing: "border-box", overflow: "hidden"}}>
            <GlobalStyles/>
            {currentView === "workflow" ? (
                <>
                    <AppHeader/>
                    <RootLayout>
                        {/* ==== SIDEBAR: Agent filter avatars ==== */}
                        <Sidebar
                            role="navigation"
                            aria-label="Agent Navigation Sidebar"
                            tabIndex={0}
                        >
                            <>Sidebar</>
                        </Sidebar>

                        {/* ==== MAIN PANEL ==== */}
                        <MainPanelLayout role="main" aria-label="Main Workflow Panel">
                            <>Main Panel Content</>
                        </MainPanelLayout>

                        {/* ==== Status ARIA live region for copy/cues ==== */}
                        <LiveRegion aria-live="polite">{ariaStatus}</LiveRegion>
                    </RootLayout>
                </>
            ) : (
                <>Other View</>
            )}
        </div>
    );
}