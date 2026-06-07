import React, { useEffect, useState } from 'react';
import { Save, User, FileText, CheckCircle } from 'lucide-react';
import { BACKEND_URL } from '../../config';

const emptySkillsText = (skills) =>
  (skills || []).map((s) => `${s.name}|${s.level}`).join('\n');

const parseSkillsText = (text) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, level] = line.split('|').map((p) => p.trim());
      return { name, level: Math.min(100, Math.max(0, Number(level) || 85)) };
    });

const DashboardProfileTab = ({ token, authFetch }) => {
  const [form, setForm] = useState(null);
  const [skillsText, setSkillsText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState('');
  const [notice, setNotice] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/site-profile`, { cache: 'no-store' });
      const data = await res.json();
      setForm(data);
      setSkillsText(emptySkillsText(data.skills));
    } catch {
      setNotice({ type: 'error', text: 'Could not load profile. Wake backend and retry.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const showSuccess = (text) => {
    setNotice({ type: 'success', text });
    setTimeout(() => setNotice(null), 4000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setNotice(null);
    try {
      const res = await authFetch(`${BACKEND_URL}/api/site-profile`, {
        method: 'PUT',
        body: JSON.stringify({
          ...form,
          skills: parseSkillsText(skillsText)
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Save failed');
      setForm(data);
      showSuccess('Profile saved. Changes are live without redeploying.');
    } catch (err) {
      setNotice({ type: 'error', text: err.message || 'Save failed' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (kind, file) => {
    if (!file) return;
    setUploading(kind);
    setNotice(null);
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch(`${BACKEND_URL}/api/site-profile/upload/${kind}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      setForm(data.profile);
      showSuccess(`${kind} uploaded successfully.`);
    } catch (err) {
      setNotice({ type: 'error', text: err.message || 'Upload failed' });
    } finally {
      setUploading('');
    }
  };

  if (loading || !form) {
    return <div className="py-12 text-center text-secondary-500">Loading profile editor…</div>;
  }

  return (
    <div className="card mb-6">
      <h2 className="text-lg font-semibold text-secondary-800 mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-primary-600" />
        Edit Profile Info (CMS)
      </h2>

      {notice && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm flex items-center gap-2 ${
            notice.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-amber-50 border border-amber-200 text-amber-800'
          }`}
        >
          {notice.type === 'success' && <CheckCircle className="w-4 h-4 shrink-0" />}
          {notice.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Hero title</label>
            <input
              type="text"
              value={form.heroTitle || ''}
              onChange={(e) => setForm((p) => ({ ...p, heroTitle: e.target.value }))}
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Hero subtitle</label>
            <input
              type="text"
              value={form.heroSubtitle || ''}
              onChange={(e) => setForm((p) => ({ ...p, heroSubtitle: e.target.value }))}
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Hero body (Home)</label>
          <textarea
            rows={4}
            value={form.heroBody || ''}
            onChange={(e) => setForm((p) => ({ ...p, heroBody: e.target.value }))}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">About intro text</label>
          <textarea
            rows={3}
            value={form.aboutText || ''}
            onChange={(e) => setForm((p) => ({ ...p, aboutText: e.target.value }))}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Skills (one per line: Name|level)
          </label>
          <textarea
            rows={6}
            value={skillsText}
            onChange={(e) => setSkillsText(e.target.value)}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg font-mono text-sm"
            placeholder="Medical Imaging AI|90"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">SEO title</label>
            <input
              type="text"
              value={form.seoTitle || ''}
              onChange={(e) => setForm((p) => ({ ...p, seoTitle: e.target.value }))}
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">OG image URL</label>
            <input
              type="url"
              value={form.ogImageUrl || ''}
              onChange={(e) => setForm((p) => ({ ...p, ogImageUrl: e.target.value }))}
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">SEO meta description</label>
          <textarea
            rows={2}
            value={form.seoDescription || ''}
            onChange={(e) => setForm((p) => ({ ...p, seoDescription: e.target.value }))}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4 pt-2 border-t border-secondary-200">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">Profile photo</label>
            <input
              type="file"
              accept="image/*"
              disabled={!!uploading}
              onChange={(e) => handleUpload('profile-image', e.target.files?.[0])}
              className="text-sm w-full"
            />
            {uploading === 'profile-image' && <p className="text-xs text-secondary-500 mt-1">Uploading…</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">About photo</label>
            <input
              type="file"
              accept="image/*"
              disabled={!!uploading}
              onChange={(e) => handleUpload('about-image', e.target.files?.[0])}
              className="text-sm w-full"
            />
            {uploading === 'about-image' && <p className="text-xs text-secondary-500 mt-1">Uploading…</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2 flex items-center gap-1">
              <FileText className="w-4 h-4" /> CV (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              disabled={!!uploading}
              onChange={(e) => handleUpload('cv-pdf', e.target.files?.[0])}
              className="text-sm w-full"
            />
            {uploading === 'cv-pdf' && <p className="text-xs text-secondary-500 mt-1">Uploading…</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={load} className="px-4 py-2 border border-secondary-300 rounded-lg">
            Reload
          </button>
          <button type="submit" disabled={saving} className="btn-primary inline-flex items-center gap-2">
            <Save className="w-4 h-4" />
            {saving ? 'Saving…' : 'Save profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardProfileTab;
