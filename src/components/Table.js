import React from "react";

const Table = ({ columns, data }) => {
    return (
        <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
                <tr>
                    {columns.map((col, idx) => (
                        <th key={idx} className="border px-4 py-2">{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <tr key={idx}>
                        {Object.values(row).map((cell, cellIdx) => (
                            <td key={cellIdx} className="border px-4 py-2">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
