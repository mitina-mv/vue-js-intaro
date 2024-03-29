PGDMP         2            
    {            task_6_backend    15.3    15.3 "    -           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            .           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            /           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            0           1262    64118    task_6_backend    DATABASE     �   CREATE DATABASE task_6_backend WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE task_6_backend;
                postgres    false            �            1259    64213 	   education    TABLE     �  CREATE TABLE public.education (
    id bigint NOT NULL,
    level character varying(255) NOT NULL,
    institution character varying(255),
    faculty character varying(255),
    specialization character varying(255),
    end_year integer,
    resume_id bigint NOT NULL,
    CONSTRAINT education_level_check CHECK (((level)::text = ANY ((ARRAY['middle'::character varying, 'middleSpec'::character varying, 'semiHigh'::character varying, 'universe'::character varying])::text[])))
);
    DROP TABLE public.education;
       public         heap    postgres    false            �            1259    64212    education_id_seq    SEQUENCE     y   CREATE SEQUENCE public.education_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.education_id_seq;
       public          postgres    false    223            1           0    0    education_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.education_id_seq OWNED BY public.education.id;
          public          postgres    false    222            �            1259    64177    failed_jobs    TABLE     &  CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.failed_jobs;
       public         heap    postgres    false            �            1259    64176    failed_jobs_id_seq    SEQUENCE     {   CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.failed_jobs_id_seq;
       public          postgres    false    217            2           0    0    failed_jobs_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;
          public          postgres    false    216            �            1259    64120 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);
    DROP TABLE public.migrations;
       public         heap    postgres    false            �            1259    64119    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public          postgres    false    215            3           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public          postgres    false    214            �            1259    64189    personal_access_tokens    TABLE     �  CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 *   DROP TABLE public.personal_access_tokens;
       public         heap    postgres    false            �            1259    64188    personal_access_tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.personal_access_tokens_id_seq;
       public          postgres    false    219            4           0    0    personal_access_tokens_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;
          public          postgres    false    218            �            1259    64201    resumes    TABLE     �  CREATE TABLE public.resumes (
    id bigint NOT NULL,
    status character varying(255) DEFAULT 'new'::character varying NOT NULL,
    profession character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    photo_path character varying(255) NOT NULL,
    full_name character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    birthdate date NOT NULL,
    salary numeric(8,2) NOT NULL,
    skills json NOT NULL,
    work_schedule character varying(255) NOT NULL,
    about text NOT NULL,
    CONSTRAINT resumes_status_check CHECK (((status)::text = ANY ((ARRAY['new'::character varying, 'interview'::character varying, 'adopted'::character varying, 'refused'::character varying])::text[]))),
    CONSTRAINT resumes_work_schedule_check CHECK (((work_schedule)::text = ANY ((ARRAY['full'::character varying, 'flexible'::character varying, 'shift'::character varying, 'remote'::character varying, 'watch'::character varying])::text[])))
);
    DROP TABLE public.resumes;
       public         heap    postgres    false            �            1259    64200    resumes_id_seq    SEQUENCE     w   CREATE SEQUENCE public.resumes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.resumes_id_seq;
       public          postgres    false    221            5           0    0    resumes_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.resumes_id_seq OWNED BY public.resumes.id;
          public          postgres    false    220                       2604    64216    education id    DEFAULT     l   ALTER TABLE ONLY public.education ALTER COLUMN id SET DEFAULT nextval('public.education_id_seq'::regclass);
 ;   ALTER TABLE public.education ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            z           2604    64180    failed_jobs id    DEFAULT     p   ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);
 =   ALTER TABLE public.failed_jobs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            y           2604    64123    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            |           2604    64192    personal_access_tokens id    DEFAULT     �   ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);
 H   ALTER TABLE public.personal_access_tokens ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            }           2604    64204 
   resumes id    DEFAULT     h   ALTER TABLE ONLY public.resumes ALTER COLUMN id SET DEFAULT nextval('public.resumes_id_seq'::regclass);
 9   ALTER TABLE public.resumes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            *          0    64213 	   education 
   TABLE DATA           i   COPY public.education (id, level, institution, faculty, specialization, end_year, resume_id) FROM stdin;
    public          postgres    false    223   x*       $          0    64177    failed_jobs 
   TABLE DATA           a   COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
    public          postgres    false    217   �*       "          0    64120 
   migrations 
   TABLE DATA           :   COPY public.migrations (id, migration, batch) FROM stdin;
    public          postgres    false    215   �*       &          0    64189    personal_access_tokens 
   TABLE DATA           �   COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
    public          postgres    false    219   V+       (          0    64201    resumes 
   TABLE DATA           �   COPY public.resumes (id, status, profession, city, photo_path, full_name, phone, email, birthdate, salary, skills, work_schedule, about) FROM stdin;
    public          postgres    false    221   s+       6           0    0    education_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.education_id_seq', 4, true);
          public          postgres    false    222            7           0    0    failed_jobs_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);
          public          postgres    false    216            8           0    0    migrations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.migrations_id_seq', 8, true);
          public          postgres    false    214            9           0    0    personal_access_tokens_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, false);
          public          postgres    false    218            :           0    0    resumes_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.resumes_id_seq', 2, true);
          public          postgres    false    220            *   '   x�3���LI�I��C C.#���؄��L���qqq ���      $      x������ � �      "   z   x�]�Q� ���râ�z�ɖ�I� ��hC�t�����h�A��pI�<{���cF��KG�r2��ʩ�{�s�k_���ҜA]c��l+���-;���ʴ8.s���R_��<�      &      x������ � �      (   �  x�ő�N�@��ӧh�*�t K]��@�*�p������ʀ���[,W_���O7�kӦ3gz�����*��7١-M�h�'�]�c4���h.�hɊ�f�ql��m�e��e܊Qo��V�\$L��6�n.�J��"c[I�OZn^��m;"�=��qQ+0z��-��9mhI[������:=�O@3�+3���=;�u�qt'��;�%X�oݓk�������<Ν8��Ź!8;���K�@"�Z@cȬ� �V�*��=�.-#�5���F��E> ��N��K^�ϔ<F:r�*�P��#-4�/L��#M)�!1��u��;	T ����o���z��a)����(@W5��P����*a�W��c�9V�#��V���r�/�g��i߼jo�     