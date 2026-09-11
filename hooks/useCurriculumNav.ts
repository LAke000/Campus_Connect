"use client";

import { useState, useMemo, useCallback } from "react";
import {
  FacultyCategory,
  FacultyDomain,
  DegreeCourse,
  SpecializationBranch,
  AcademicYear,
  Subject,
  UniversityTaxonomy
} from "@/types/curriculum";
import {
  universityCurriculumTaxonomy,
  facultyEngineering,
  btechDegreeCourse,
  btechCseBranch
} from "@/data/curriculumHierarchy";

export interface CurriculumNavState {
  // Active IDs
  selectedFacultyId: string;
  selectedDegreeId: string;
  selectedBranchId: string;
  selectedYearIndex: number;

  // Active Entities (Guaranteed Non-Null with safe fallbacks)
  currentFaculty: FacultyCategory;
  currentDegree: DegreeCourse;
  currentBranch: SpecializationBranch;
  currentYear: AcademicYear;

  // Available options at each level
  availableFaculties: FacultyCategory[];
  availableDegrees: DegreeCourse[];
  availableBranches: SpecializationBranch[];
  availableYears: AcademicYear[];

  // State Mutators with Cascading Resets
  setFaculty: (facultyId: string) => void;
  setDegree: (degreeId: string) => void;
  setBranch: (branchId: string) => void;
  setYearIndex: (yearIndex: number) => void;
  selectByDomain: (domain: FacultyDomain) => void;
  resetToDefault: () => void;
}

export interface UseCurriculumNavOptions {
  initialFacultyId?: string;
  initialDegreeId?: string;
  initialBranchId?: string;
  initialYearIndex?: number;
  taxonomy?: UniversityTaxonomy;
}

/**
 * Custom hook providing a robust, state-safe cascading selection pipeline for the LPU curriculum hierarchy.
 * Automatically guarantees valid child state on higher-level category transitions.
 */
export function useCurriculumNav(options: UseCurriculumNavOptions = {}): CurriculumNavState {
  const taxonomy = options.taxonomy || universityCurriculumTaxonomy;
  const availableFaculties = useMemo(() => taxonomy.faculties, [taxonomy]);

  // Default initial values
  const defaultFacultyId = options.initialFacultyId || "faculty-engineering";
  const defaultDegreeId = options.initialDegreeId || "degree-btech";
  const defaultBranchId = options.initialBranchId || "branch-btech-cse";
  const defaultYearIndex = options.initialYearIndex !== undefined ? options.initialYearIndex : 1; // Default to Year 2

  const [selectedFacultyId, setSelectedFacultyId] = useState<string>(defaultFacultyId);
  const [selectedDegreeId, setSelectedDegreeId] = useState<string>(defaultDegreeId);
  const [selectedBranchId, setSelectedBranchId] = useState<string>(defaultBranchId);
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(defaultYearIndex);

  // 1. Resolve Active Faculty
  const currentFaculty = useMemo<FacultyCategory>(() => {
    const found = availableFaculties.find(
      (f) => f.id === selectedFacultyId || f.code.toLowerCase() === selectedFacultyId.toLowerCase()
    );
    return found || availableFaculties[0] || facultyEngineering;
  }, [availableFaculties, selectedFacultyId]);

  // Available degrees for current faculty
  const availableDegrees = useMemo<DegreeCourse[]>(() => {
    return currentFaculty.degreeCourses || [];
  }, [currentFaculty]);

  // 2. Resolve Active Degree (Fall back to first available degree in current faculty)
  const currentDegree = useMemo<DegreeCourse>(() => {
    const found = availableDegrees.find(
      (d) => d.id === selectedDegreeId || d.code.toLowerCase() === selectedDegreeId.toLowerCase()
    );
    return found || availableDegrees[0] || btechDegreeCourse;
  }, [availableDegrees, selectedDegreeId]);

  // Available branches for current degree
  const availableBranches = useMemo<SpecializationBranch[]>(() => {
    return currentDegree.specializations || currentDegree.programs || [];
  }, [currentDegree]);

  // 3. Resolve Active Branch (Fall back to first available branch in current degree)
  const currentBranch = useMemo<SpecializationBranch>(() => {
    const found = availableBranches.find(
      (b) =>
        b.id === selectedBranchId ||
        b.code.toLowerCase() === selectedBranchId.toLowerCase() ||
        b.shortName?.toLowerCase() === selectedBranchId.toLowerCase()
    );
    return found || availableBranches[0] || btechCseBranch;
  }, [availableBranches, selectedBranchId]);

  // Available academic years for current branch
  const availableYears = useMemo<AcademicYear[]>(() => {
    const years = currentBranch.academicYears || currentBranch.years || [];
    if (years.length > 0) return years;
    // Fallback single year if branch is empty
    return [
      {
        year: 1,
        label: "Year 1 - Foundation & Core Curriculum",
        semesters: ["Semester 1", "Semester 2"],
        hasContent: false,
        subjects: []
      }
    ];
  }, [currentBranch]);

  // 4. Resolve Active Year (Clamped within bounds)
  const currentYear = useMemo<AcademicYear>(() => {
    const clampedIndex = Math.min(
      Math.max(0, selectedYearIndex),
      Math.max(0, availableYears.length - 1)
    );
    return availableYears[clampedIndex] || availableYears[0];
  }, [availableYears, selectedYearIndex]);

  // ── Mutators with Automatic Cascading State Normalization ───────────────────

  const setFaculty = useCallback(
    (facultyId: string) => {
      setSelectedFacultyId(facultyId);

      const targetFaculty = availableFaculties.find(
        (f) => f.id === facultyId || f.code.toLowerCase() === facultyId.toLowerCase()
      );

      if (targetFaculty && targetFaculty.degreeCourses.length > 0) {
        const firstDegree = targetFaculty.degreeCourses[0];
        setSelectedDegreeId(firstDegree.id);

        const branches = firstDegree.specializations || firstDegree.programs || [];
        if (branches.length > 0) {
          setSelectedBranchId(branches[0].id);
          const years = branches[0].academicYears || branches[0].years || [];
          setSelectedYearIndex(0);
        }
      }
    },
    [availableFaculties]
  );

  const selectByDomain = useCallback(
    (domain: FacultyDomain) => {
      const target = availableFaculties.find((f) => f.name === domain);
      if (target) {
        setFaculty(target.id);
      }
    },
    [availableFaculties, setFaculty]
  );

  const setDegree = useCallback(
    (degreeId: string) => {
      setSelectedDegreeId(degreeId);

      const targetDegree = availableDegrees.find(
        (d) => d.id === degreeId || d.code.toLowerCase() === degreeId.toLowerCase()
      );

      if (targetDegree) {
        const branches = targetDegree.specializations || targetDegree.programs || [];
        if (branches.length > 0) {
          setSelectedBranchId(branches[0].id);
          setSelectedYearIndex(0);
        }
      }
    },
    [availableDegrees]
  );

  const setBranch = useCallback(
    (branchId: string) => {
      setSelectedBranchId(branchId);

      const targetBranch = availableBranches.find(
        (b) =>
          b.id === branchId ||
          b.code.toLowerCase() === branchId.toLowerCase() ||
          b.shortName?.toLowerCase() === branchId.toLowerCase()
      );

      if (targetBranch) {
        const years = targetBranch.academicYears || targetBranch.years || [];
        // Keep year index within target branch's valid bounds
        setSelectedYearIndex((prev) => (prev >= years.length ? Math.max(0, years.length - 1) : prev));
      }
    },
    [availableBranches]
  );

  const setYearIndex = useCallback(
    (yearIndex: number) => {
      const maxIndex = Math.max(0, availableYears.length - 1);
      setSelectedYearIndex(Math.min(Math.max(0, yearIndex), maxIndex));
    },
    [availableYears]
  );

  const resetToDefault = useCallback(() => {
    setSelectedFacultyId("faculty-engineering");
    setSelectedDegreeId("degree-btech");
    setSelectedBranchId("branch-btech-cse");
    setSelectedYearIndex(1);
  }, []);

  return {
    selectedFacultyId,
    selectedDegreeId,
    selectedBranchId,
    selectedYearIndex,
    currentFaculty,
    currentDegree,
    currentBranch,
    currentYear,
    availableFaculties,
    availableDegrees,
    availableBranches,
    availableYears,
    setFaculty,
    setDegree,
    setBranch,
    setYearIndex,
    selectByDomain,
    resetToDefault
  };
}

export default useCurriculumNav;
