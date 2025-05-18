-- Create resources table
create table if not exists public.resources (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  category text not null,
  type text not null,
  time text not null,
  difficulty text not null,
  content_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.resources enable row level security;

-- Create policies
create policy "Resources are viewable by everyone"
  on public.resources for select
  using (true);

create policy "Resources can be created by authenticated users"
  on public.resources for insert
  with check (auth.role() = 'authenticated');

create policy "Resources can be updated by authenticated users"
  on public.resources for update
  using (auth.role() = 'authenticated');

create policy "Resources can be deleted by authenticated users"
  on public.resources for delete
  using (auth.role() = 'authenticated');

-- Create indexes
create index resources_category_idx on public.resources(category);
create index resources_type_idx on public.resources(type);
create index resources_difficulty_idx on public.resources(difficulty);

-- Insert initial resources
insert into public.resources (title, description, category, type, time, difficulty, content_url) values
  ('Understanding the Addiction Cycle', 'Learn about the neurological and psychological aspects of addiction and how they form a cycle.', 'substance', 'article', '8 min read', 'Beginner', 'https://example.com/addiction-cycle'),
  ('Identifying and Managing Triggers', 'Practical techniques to identify personal triggers and develop strategies to manage them effectively.', 'coping', 'article', '12 min read', 'Intermediate', 'https://example.com/triggers'),
  ('Mindfulness Meditation for Recovery', 'Guided meditation practices specifically designed to help during recovery and craving moments.', 'coping', 'video', '15 min watch', 'Beginner', 'https://example.com/mindfulness'),
  ('Building a Sober Support Network', 'How to create and maintain relationships that support your recovery journey.', 'relapse', 'article', '10 min read', 'Intermediate', 'https://example.com/support-network'),
  ('The Science of Alcohol Addiction', 'An in-depth look at how alcohol affects the brain and body, and why addiction develops.', 'alcohol', 'video', '22 min watch', 'Advanced', 'https://example.com/alcohol-science'),
  ('Digital Detox Strategies', 'Practical steps to reduce technology dependence and create healthier digital habits.', 'technology', 'article', '7 min read', 'Beginner', 'https://example.com/digital-detox'),
  ('Recovery Stories: From Gambling to Freedom', 'Personal accounts of recovery from gambling addiction and the strategies that worked.', 'gambling', 'audio', '35 min listen', 'Beginner', 'https://example.com/gambling-stories'),
  ('Creating a Relapse Prevention Plan', 'Step-by-step guide to developing a personalized plan to prevent relapse.', 'relapse', 'article', '15 min read', 'Intermediate', 'https://example.com/relapse-prevention'); 