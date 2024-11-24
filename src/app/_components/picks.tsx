import type { Assignments } from "@/types";
import { Gift, ArrowBigRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Picks({ picks }: { picks?: Assignments }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hasOverflow, setHasOverflow] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current) {
                setHasOverflow(
                    containerRef.current.scrollHeight >
                        containerRef.current.clientHeight,
                );
            }
        };

        checkOverflow();

        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [picks]);

    return (
        <div
            ref={containerRef}
            className="no-scrollbar mb-4 mt-4 max-h-[calc(100vh-375px)] overflow-y-auto rounded-lg px-1 pt-1"
            style={{
                backgroundImage: hasOverflow
                    ? "linear-gradient(0deg, #173f2c 0%, rgb(0, 0, 0, 0) 50%)"
                    : "none",
                backgroundSize: "100% 180%",
            }}
        >
            <table className="mt-7 w-full table-auto border-collapse">
                <tbody>
                    {picks?.assignments.map((assignment, ix) => (
                        <tr key={ix} className="mb-7">
                            <td className="pb-5 pr-2 text-right">
                                {assignment.buyer.firstName}
                            </td>
                            <td className="flex justify-center pb-5 text-appYellow">
                                <Gift />
                                <ArrowBigRight />
                            </td>
                            <td className="pb-5 pl-1 text-left">
                                {assignment.recipient.firstName}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
