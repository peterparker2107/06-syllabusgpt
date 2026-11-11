import { TIET_REGULATIONS } from '../data/tietRegulations';
import type { RegulationStatute } from '../data/tietRegulations';

export interface SearchResult {
  statute: RegulationStatute;
  score: number;
  confidencePercent: number;
  matchedTerms: string[];
  matchedSnippet: string;
}

// Synonyms dictionary for campus colloquialisms to official legal statutes
const SYNONYMS: Record<string, string[]> = {
  'hackathon': ['technical competition', 'coding contest', 'event', 'inter-university', 'symposium'],
  'competition': ['technical competition', 'coding contest', 'duty leave', '4.2.1', 'symposium'],
  'duty leave': ['od', 'on duty', 'exemption', 'attendance duty', 'attendance waiver'],
  'attendance': ['75%', '65%', 'condonation', 'detention', 'presence', 'shortfall'],
  'medical': ['hospital', 'illness', 'sick', 'doctor', 'health centre', '5 days'],
  'detention': ['detained', '48 hours', 'webkiosk', 'shortfall', 'appeal'],
  'hostel': ['curfew', 'night out', 'late entry', 'warden', 'gate', 'slip'],
  'marks': ['grade', 're-evaluation', 'scrutiny', 'answer sheet', 'paper checking', 'totaling'],
  'makeup': ['missed', 're-exam', 'hospitalization', 'mst', 'est'],
  'placement': ['cilp', 'interview', 'job', 'ppt', 'test', 'recruitment'],
  'summer': ['backlog', 'f grade', 'remedial', 'summer term', '12 credits'],
  'drop': ['withdrawal', 'semester drop', 'leave of absence', 'pause']
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[§.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1);
}

export function searchRegulations(query: string, categoryFilter?: string): SearchResult[] {
  const cleanQuery = query.trim().toLowerCase();
  
  if (!cleanQuery) {
    const list = categoryFilter && categoryFilter !== 'All'
      ? TIET_REGULATIONS.filter(r => r.category === categoryFilter)
      : TIET_REGULATIONS;
      
    return list.map(statute => ({
      statute,
      score: 1.0,
      confidencePercent: 95,
      matchedTerms: [],
      matchedSnippet: statute.studentSummary
    }));
  }

  const queryTokens = tokenize(cleanQuery);
  const expandedTokens = new Set<string>(queryTokens);

  // Expand with synonyms
  for (const token of queryTokens) {
    if (SYNONYMS[token]) {
      SYNONYMS[token].forEach(syn => {
        tokenize(syn).forEach(t => expandedTokens.add(t));
      });
    }
    // Substring lookup for synonyms
    for (const [key, synList] of Object.entries(SYNONYMS)) {
      if (token.includes(key) || key.includes(token)) {
        synList.forEach(syn => tokenize(syn).forEach(t => expandedTokens.add(t)));
      }
    }
  }

  const tokenList = Array.from(expandedTokens);

  const results: SearchResult[] = [];

  for (const statute of TIET_REGULATIONS) {
    if (categoryFilter && categoryFilter !== 'All' && statute.category !== categoryFilter) {
      continue;
    }

    let score = 0;
    const matchedTerms = new Set<string>();

    const sectionNum = statute.section.toLowerCase().replace('§', '').trim();
    const cleanTitle = statute.title.toLowerCase();
    const cleanClause = statute.verbatimClause.toLowerCase();
    const cleanSummary = statute.studentSummary.toLowerCase();
    const tagsLower = statute.tags.map(t => t.toLowerCase());
    const sampleQueriesLower = statute.sampleQueries.map(q => q.toLowerCase());

    // 1. Direct section number query (e.g. "4.2.1" or "§ 4.2.1")
    if (cleanQuery.includes(sectionNum) || statute.section.toLowerCase().includes(cleanQuery)) {
      score += 150;
      matchedTerms.add(statute.section);
    }

    // 2. Exact full-query string matches
    if (cleanTitle.includes(cleanQuery)) {
      score += 80;
      matchedTerms.add(cleanQuery);
    }
    if (cleanClause.includes(cleanQuery)) {
      score += 60;
      matchedTerms.add(cleanQuery);
    }
    if (cleanSummary.includes(cleanQuery)) {
      score += 50;
      matchedTerms.add(cleanQuery);
    }

    // 3. Sample queries semantic overlap
    for (const sq of sampleQueriesLower) {
      if (sq.includes(cleanQuery) || cleanQuery.includes(sq)) {
        score += 70;
      }
      let sqOverlap = 0;
      for (const token of queryTokens) {
        if (sq.includes(token)) sqOverlap++;
      }
      if (sqOverlap >= 2) {
        score += sqOverlap * 15;
      }
    }

    // 4. Token matches across elements
    for (const token of tokenList) {
      const isOriginalQueryToken = queryTokens.includes(token);
      const weightMultiplier = isOriginalQueryToken ? 1.0 : 0.6;

      if (cleanTitle.includes(token)) {
        score += 25 * weightMultiplier;
        matchedTerms.add(token);
      }
      if (tagsLower.some(t => t.includes(token))) {
        score += 30 * weightMultiplier;
        matchedTerms.add(token);
      }
      if (cleanClause.includes(token)) {
        score += 12 * weightMultiplier;
        matchedTerms.add(token);
      }
      if (cleanSummary.includes(token)) {
        score += 15 * weightMultiplier;
        matchedTerms.add(token);
      }
      if (statute.keyConditions.some(c => c.toLowerCase().includes(token))) {
        score += 10 * weightMultiplier;
        matchedTerms.add(token);
      }
    }

    if (score > 15) {
      // Calculate normalized confidence percentage (60% - 99%)
      const confidencePercent = Math.min(99, Math.round(65 + Math.min(score, 120) * 0.28));

      // Determine best snippet to show
      let snippet = statute.studentSummary;
      for (const token of queryTokens) {
        const idx = cleanClause.indexOf(token);
        if (idx !== -1) {
          const start = Math.max(0, idx - 40);
          const end = Math.min(cleanClause.length, idx + 120);
          snippet = (start > 0 ? '...' : '') + statute.verbatimClause.slice(start, end) + '...';
          break;
        }
      }

      results.push({
        statute,
        score,
        confidencePercent,
        matchedTerms: Array.from(matchedTerms),
        matchedSnippet: snippet
      });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results;
}
