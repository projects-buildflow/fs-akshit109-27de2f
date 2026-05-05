"""Tests for Task fs-1.2: Full-Stack Week 1 Task 2

Placeholder test for full-stack track.
"""

import pytest
from pathlib import Path


class TestWeek1Task2:
    """Verify week 1 task 2 completion."""

    def test_task_completed(self, student_folder):
        """Student must complete the task."""
        if not student_folder:
            pytest.skip("Student folder not provided")
        # Placeholder - actual tests to be implemented
        pass
