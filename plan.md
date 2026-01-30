# Persistence Plan: Schichtplaner

## Summary

Ein Schichtplaner-Dashboard zur Verwaltung von Mitarbeiter-Schichten mit einer interaktiven Wochenansicht. Benutzer können sehen, wer wann arbeitet und Schichten direkt in der Ansicht bearbeiten.

## Proposed Apps

### App: employees
- **Name:** Mitarbeiter
- **Purpose:** Speichert Mitarbeiterdaten
- **UI Components:** Mitarbeiter-Zeilen in der Wochenansicht, Mitarbeiter-Auswahl
- **Fields:**
  - `name` (string): Vollständiger Name des Mitarbeiters
  - `position` (lookup): Position/Rolle des Mitarbeiters
  - `color` (string): Farbe für die Darstellung im Kalender

### App: shifts
- **Name:** Schichten
- **Purpose:** Speichert einzelne Schichten
- **UI Components:** Schicht-Blöcke in der Wochenansicht
- **Fields:**
  - `employee` (applookup): Zugewiesener Mitarbeiter
  - `date` (date): Datum der Schicht
  - `start_time` (string): Startzeit (HH:MM)
  - `end_time` (string): Endzeit (HH:MM)
  - `shift_type` (lookup): Art der Schicht (Früh, Spät, Nacht)
  - `notes` (textarea): Optionale Notizen

## Relationships

- shifts.employee -> employees (many-to-one)

## JSON Schema

The following JSON is used for automatic app provisioning. **DO NOT EDIT MANUALLY.**

```json
{
  "apps": [
    {
      "name": "Mitarbeiter",
      "identifier": "employees",
      "controls": {
        "name": {
          "fulltype": "string/text",
          "label": "Name",
          "required": true,
          "in_list": true,
          "in_text": true
        },
        "position": {
          "fulltype": "lookup/select",
          "label": "Position",
          "lookups": [
            {"key": "manager", "value": "Manager"},
            {"key": "employee", "value": "Mitarbeiter"},
            {"key": "trainee", "value": "Auszubildender"},
            {"key": "parttime", "value": "Teilzeit"}
          ],
          "in_list": true
        },
        "color": {
          "fulltype": "string/text",
          "label": "Farbe",
          "required": false
        }
      }
    },
    {
      "name": "Schichten",
      "identifier": "shifts",
      "controls": {
        "employee": {
          "fulltype": "applookup/select",
          "label": "Mitarbeiter",
          "lookup_app_ref": "employees",
          "required": true,
          "in_list": true
        },
        "date": {
          "fulltype": "date/date",
          "label": "Datum",
          "required": true,
          "in_list": true
        },
        "start_time": {
          "fulltype": "string/text",
          "label": "Start",
          "required": true,
          "in_list": true
        },
        "end_time": {
          "fulltype": "string/text",
          "label": "Ende",
          "required": true,
          "in_list": true
        },
        "shift_type": {
          "fulltype": "lookup/select",
          "label": "Schichttyp",
          "lookups": [
            {"key": "morning", "value": "Frühschicht"},
            {"key": "afternoon", "value": "Spätschicht"},
            {"key": "night", "value": "Nachtschicht"}
          ],
          "in_list": true
        },
        "notes": {
          "fulltype": "string/textarea",
          "label": "Notizen",
          "required": false
        }
      }
    }
  ]
}
```
