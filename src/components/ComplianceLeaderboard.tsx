
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Trophy } from "lucide-react";

// Mock data for top companies
const topCompanies = [
  { id: 1, name: "EcoSolutions Inc.", score: 95, industry: "Manufacturing" },
  { id: 2, name: "GreenTech Systems", score: 92, industry: "Technology" },
  { id: 3, name: "Sustainable Ventures", score: 89, industry: "Energy" },
  { id: 4, name: "BioFriendly Corp", score: 87, industry: "Agriculture" },
  { id: 5, name: "Clean Future Ltd", score: 84, industry: "Recycling" },
];

const ComplianceLeaderboard = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold leading-none tracking-tight dark:text-white">
            Compliance Leaderboard
          </h3>
          <Trophy className="h-4 w-4 text-amber-400" />
        </div>
        <p className="text-sm text-muted-foreground dark:text-white/70 mb-4">
          Top companies by compliance score
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topCompanies.map((company, index) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <span className={`
                      flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold
                      ${index === 0 ? 'bg-amber-400 text-amber-950' : 
                        index === 1 ? 'bg-gray-300 text-gray-800' : 
                        index === 2 ? 'bg-amber-700 text-amber-100' : 'bg-muted text-muted-foreground'}
                    `}>
                      {index + 1}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="dark:text-white">{company.name}</TableCell>
                <TableCell className="text-muted-foreground dark:text-white/70">{company.industry}</TableCell>
                <TableCell className="text-right font-medium text-primary dark:text-white">
                  {company.score}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ComplianceLeaderboard;
