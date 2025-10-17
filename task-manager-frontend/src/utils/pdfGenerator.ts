import jsPDF from "jspdf";
import type { Task } from "../types/taskType";

export const generateTaskReport = (tasks: Task[]) => {
    const doc = new jsPDF();

    // header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Task Manager Report', 105, 20, { align: "center" });

    // timestamp
    doc.setFontSize(20);
    doc.setFont('helvetica', 'notmal');
    const timestamp = new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short'
    });
    doc.text(`Generated: ${timestamp}`, 105, 28, { align: "center" });

    // summary
    const completedCount = tasks.filter(t => t.completed).length;
    const pendingCount = tasks.length - completedCount;

    doc.setFontSize(12);
    doc.text(`Total Task: ${tasks.length}`, 20, 40);
    doc.text(`Completed: ${completedCount}`, 20, 47);
    doc.text(`Pending: ${pendingCount}`, 20, 54);

    // line
    doc.setLineWidth(0.5);
    doc.line(20, 60, 190, 60);

    // tasks list
    let yPosition = 70;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("Task:", 20, yPosition);

    yPosition += 10;

    if (tasks.length === 0) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.text('No tasks available', 20, yPosition);
    } else {
        tasks.forEach((task, index) => {
        // check new page
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
        }
        
        // task number and status
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}.`, 20, yPosition);
        
        // task title
        doc.setFont('helvetica', 'bold');
        const title = doc.splitTextToSize(task.title, 150);
        doc.text(title, 25, yPosition);
        yPosition += title.length * 5;
        
        // task description
        if (task.description) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            const description = doc.splitTextToSize(task.description, 150);
            doc.text(description, 25, yPosition);
            yPosition += description.length * 5;
        }
        
        // status label
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        task.completed ? doc.setTextColor(34, 197, 94) : doc.setTextColor(156, 163, 175)
        doc.text(task.completed ? 'Completed' : 'Pending', 25, yPosition);
        doc.setTextColor(0, 0, 0);
        
        yPosition += 10;
        });
    }
    
    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(
        `Page ${i} of ${pageCount}`,
        105,
        290,
        { align: 'center' }
        );
    }
    
    // Save the PDF
    const filename = `task-report-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
};