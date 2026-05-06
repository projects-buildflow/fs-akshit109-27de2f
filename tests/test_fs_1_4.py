"""Tests for Task fs-1.4: Full-Stack Week 1 Task 4

Placeholder test for full-stack track.
"""

import pytest


class TestWeek1Task4:
    """Verify week 1 task 4 completion."""

    def test_task_completed(self, student_folder):
        """Student must complete the task."""
        if not student_folder:
            pytest.skip("Student folder not provided")
        pass
