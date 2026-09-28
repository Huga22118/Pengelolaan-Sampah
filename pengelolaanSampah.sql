--
-- PostgreSQL database dump
--

\restrict EGENGhvMwsy2yZaircbVqBj1ctJpvOgTFIAKFmWE2IFnhSqasrZ1uOuZ9KVqtAo

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: FotoSampah; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FotoSampah" (
    id text NOT NULL,
    "imageUrl" text NOT NULL,
    "laporanId" text NOT NULL
);


ALTER TABLE public."FotoSampah" OWNER TO postgres;

--
-- Name: JenisSampah; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."JenisSampah" (
    id text NOT NULL,
    "namaJenis" text NOT NULL
);


ALTER TABLE public."JenisSampah" OWNER TO postgres;

--
-- Name: LaporanSampah; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LaporanSampah" (
    id text NOT NULL,
    berat double precision NOT NULL,
    "tanggalLapor" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL,
    "jenisSampahId" text NOT NULL,
    "wilayahId" text NOT NULL
);


ALTER TABLE public."LaporanSampah" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    nama text NOT NULL,
    nik text NOT NULL,
    email text NOT NULL,
    "noHp" text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: Wilayah; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Wilayah" (
    id text NOT NULL,
    "namaWilayah" text NOT NULL
);


ALTER TABLE public."Wilayah" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: FotoSampah; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FotoSampah" (id, "imageUrl", "laporanId") FROM stdin;
3ca0320a-7101-47b2-875e-0007d8984de3	/uploads/1788762428360.jpg	815bb657-67ef-446d-bf3c-696ee7c8559b
\.


--
-- Data for Name: JenisSampah; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."JenisSampah" (id, "namaJenis") FROM stdin;
d75041c8-948a-4f54-b437-42c677375131	Non-Organik
\.


--
-- Data for Name: LaporanSampah; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LaporanSampah" (id, berat, "tanggalLapor", "userId", "jenisSampahId", "wilayahId") FROM stdin;
815bb657-67ef-446d-bf3c-696ee7c8559b	2.5	2026-09-07 06:27:08.76	7bc910b4-8ac9-434b-94a6-5334f953d9a4	d75041c8-948a-4f54-b437-42c677375131	49402e4b-57e8-418c-9d2f-a6e0d0a9ab7d
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, nama, nik, email, "noHp", password, role) FROM stdin;
7bc910b4-8ac9-434b-94a6-5334f953d9a4	Administrator	0000000000000000	admin@example.com	081234567890	$2b$10$CljNexySArWaG7w1rsMDsuaNIHL2W9C72IE8O72vRpbJCo.b9fF5u	ADMIN
e7be7613-8e49-4329-8616-f09ea3138dd1	User Biasa	1111111111111111	user@example.com	089876543210	$2b$10$KRyuF6i8xn6AaeaEe/W/LOgOdVUrrg6N.JLJJWlHIOp4P2PlChAmm	USER
599de73c-51d3-4dc8-af75-886434223a7f	huga	12313	huga.ghaisan@gmail.com	082144171062	$2b$10$UzuyDjG/nso9kgXyMGzrBepQ218ym6VfqsSPo8OxpE0nNEcpghAMC	USER
\.


--
-- Data for Name: Wilayah; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Wilayah" (id, "namaWilayah") FROM stdin;
49402e4b-57e8-418c-9d2f-a6e0d0a9ab7d	Jakarta Selatan
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
288759fc-7b74-428f-a7c6-33bc075c35c9	519d624735ec3032d3b4b3003268070861c722d8672de030a57147f3aab1a155	2026-08-10 22:26:15.964155+07	20260810152615_init	\N	\N	2026-08-10 22:26:15.918842+07	1
66d98494-a349-4c28-ba11-bc62e69e9e97	4572ad83db42c067bc95225f58c3fc187ca84dcc719dc44b7a09389d915131b2	2026-08-10 22:31:17.825294+07	20260810153117_add_laporan_sampah_relations	\N	\N	2026-08-10 22:31:17.730225+07	1
f6596eae-b35a-435f-b3c1-57ec3586e74f	a8e77efde6447d93ced8f55c2805259b57e2876d3f3ced0c0cca6040cd924ab9	2026-08-10 22:37:08.16135+07	20260810153708_add_foto_sampah_and_composite_unique	\N	\N	2026-08-10 22:37:08.115271+07	1
bdf6873c-8b73-47ed-9973-8b24cbd05633	71dc2620be22678ef209e328967a9f28d16109f071a828af03ac301104cb410d	2026-08-10 22:59:24.240476+07	20260810155924_add_auth_fields	\N	\N	2026-08-10 22:59:24.221275+07	1
\.


--
-- Name: FotoSampah FotoSampah_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FotoSampah"
    ADD CONSTRAINT "FotoSampah_pkey" PRIMARY KEY (id);


--
-- Name: JenisSampah JenisSampah_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."JenisSampah"
    ADD CONSTRAINT "JenisSampah_pkey" PRIMARY KEY (id);


--
-- Name: LaporanSampah LaporanSampah_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LaporanSampah"
    ADD CONSTRAINT "LaporanSampah_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Wilayah Wilayah_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Wilayah"
    ADD CONSTRAINT "Wilayah_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: FotoSampah_laporanId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "FotoSampah_laporanId_key" ON public."FotoSampah" USING btree ("laporanId");


--
-- Name: JenisSampah_namaJenis_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "JenisSampah_namaJenis_key" ON public."JenisSampah" USING btree ("namaJenis");


--
-- Name: LaporanSampah_userId_jenisSampahId_tanggalLapor_wilayahId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "LaporanSampah_userId_jenisSampahId_tanggalLapor_wilayahId_key" ON public."LaporanSampah" USING btree ("userId", "jenisSampahId", "tanggalLapor", "wilayahId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_nik_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_nik_key" ON public."User" USING btree (nik);


--
-- Name: User_noHp_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_noHp_key" ON public."User" USING btree ("noHp");


--
-- Name: Wilayah_namaWilayah_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Wilayah_namaWilayah_key" ON public."Wilayah" USING btree ("namaWilayah");


--
-- Name: FotoSampah FotoSampah_laporanId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FotoSampah"
    ADD CONSTRAINT "FotoSampah_laporanId_fkey" FOREIGN KEY ("laporanId") REFERENCES public."LaporanSampah"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LaporanSampah LaporanSampah_jenisSampahId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LaporanSampah"
    ADD CONSTRAINT "LaporanSampah_jenisSampahId_fkey" FOREIGN KEY ("jenisSampahId") REFERENCES public."JenisSampah"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: LaporanSampah LaporanSampah_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LaporanSampah"
    ADD CONSTRAINT "LaporanSampah_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LaporanSampah LaporanSampah_wilayahId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LaporanSampah"
    ADD CONSTRAINT "LaporanSampah_wilayahId_fkey" FOREIGN KEY ("wilayahId") REFERENCES public."Wilayah"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict EGENGhvMwsy2yZaircbVqBj1ctJpvOgTFIAKFmWE2IFnhSqasrZ1uOuZ9KVqtAo

