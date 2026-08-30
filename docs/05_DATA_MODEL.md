# Data Model — Under One Roof

This is a suggested relational model. It can be adapted for Supabase/PostgreSQL or Firebase/Firestore.

## users

Represents app users.

Fields:

- id
- email
- full_name
- created_at
- updated_at

## homes

Represents one living place.

Fields:

- id
- user_id
- name
- address_line_1
- address_line_2
- city
- state
- zip_code
- country
- occupancy_type: renter | owner | landlord | other
- home_type: apartment | house | condo | townhome | room | other
- move_in_date
- notes
- water_shutoff_location
- breaker_panel_location
- gas_shutoff_location
- created_at
- updated_at

## bills

Represents recurring household costs.

Fields:

- id
- user_id
- home_id
- name
- provider
- category
- amount
- currency
- due_day_of_month
- next_due_date
- frequency: weekly | biweekly | monthly | quarterly | annually | custom
- autopay_enabled
- account_number_hint
- contact_phone
- contact_email
- website_url
- notes
- status: active | paused | cancelled
- created_at
- updated_at

## bill_payments

Optional later table for bill history.

Fields:

- id
- bill_id
- amount_paid
- paid_date
- due_date
- notes
- created_at

## contracts

Represents agreements and renewals.

Fields:

- id
- user_id
- home_id
- name
- contract_type
- provider
- start_date
- end_date
- renewal_date
- cancellation_deadline
- monthly_cost
- annual_cost
- auto_renews: yes | no | unknown
- negotiation_possible: yes | no | unknown
- summary
- key_terms
- notes
- status: active | expired | cancelled | unknown
- created_at
- updated_at

## documents

Represents uploaded files and records.

Fields:

- id
- user_id
- home_id
- related_entity_type: bill | contract | maintenance_task | repair_issue | home | none
- related_entity_id
- file_name
- file_path
- file_type
- category
- uploaded_at
- extracted_text
- ai_summary
- notes

## maintenance_tasks

Represents recurring or one-time tasks.

Fields:

- id
- user_id
- home_id
- name
- category
- description
- due_date
- frequency
- responsible_party: user | landlord | property_manager | contractor | unknown
- status: upcoming | completed | overdue | skipped
- estimated_cost
- actual_cost
- notes
- created_at
- updated_at

## maintenance_logs

Represents completed maintenance events.

Fields:

- id
- maintenance_task_id
- completed_date
- completed_by
- cost
- notes
- document_id
- created_at

## repair_issues

Represents a problem or repair.

Fields:

- id
- user_id
- home_id
- title
- description
- category
- priority: low | medium | high | emergency
- status: open | scheduled | in_progress | resolved | cancelled
- date_noticed
- contractor_name
- estimated_cost
- final_cost
- warranty_related
- notes
- created_at
- updated_at

## contacts

Represents home-related people and businesses.

Fields:

- id
- user_id
- home_id
- name
- type: landlord | property_manager | plumber | electrician | hvac | insurance | utility | contractor | other
- phone
- email
- website
- notes
- rating
- created_at
- updated_at

## reminders

Represents reminder events.

Fields:

- id
- user_id
- home_id
- title
- description
- due_date
- related_entity_type
- related_entity_id
- reminder_type: bill | contract | maintenance | repair | document | custom
- status: pending | completed | dismissed
- created_at
- updated_at

## insights

Represents AI-generated recommendations.

Fields:

- id
- user_id
- home_id
- title
- message
- insight_type: negotiation | maintenance | renewal | safety | cost_change | document | general
- priority: low | medium | high
- related_entity_type
- related_entity_id
- status: active | dismissed | completed
- created_at

## Example Relationships

- One user can have many homes.
- One home can have many bills.
- One bill can have many payment records.
- One home can have many contracts.
- One contract can have many documents.
- One home can have many maintenance tasks.
- One maintenance task can have many logs.
- One repair issue can have many documents.
