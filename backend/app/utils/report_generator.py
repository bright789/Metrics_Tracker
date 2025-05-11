import csv
import io
from flask import Response
from app.models.task import Task
from app.models.commit import Commit
from app.models.pipeline import Pipeline

def generate_csv_report():
    output = io.StringIO()
    writer = csv.writer(output)

    writer.writerow(['--- TASKS ---'])
    writer.writerow(['ID', 'Title', 'Status', 'Created At'])
    for t in Task.query.all():
        writer.writerow([t.id, t.title, t.status, t.created_at])

    writer.writerow([])
    writer.writerow(['--- COMMITS ---'])
    writer.writerow(['ID', 'Repo', 'Author', 'Message', 'Timestamp'])
    for c in Commit.query.all():
        writer.writerow([c.id, c.repo, c.author, c.message, c.timestamp])

    writer.writerow([])
    writer.writerow(['--- PIPELINES ---'])
    writer.writerow(['ID', 'Name', 'Status', 'Duration (s)', 'Started', 'Finished'])
    for p in Pipeline.query.all():
        writer.writerow([p.id, p.name, p.status, p.duration_seconds, p.started_at, p.finished_at])

    output.seek(0)
    return Response(output, mimetype='text/csv',
                    headers={'Content-Disposition': 'attachment; filename=report.csv'})
