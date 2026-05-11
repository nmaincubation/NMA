import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Filter, CheckCircle2, Circle, Zap, Clock, AlertCircle, Share2, Download } from 'lucide-react';
import Head from 'next/head';

export default function ProjectTracker() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('الكل');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [shareUrl, setShareUrl] = useState('');

  // تحميل البيانات عند الدخول
  useEffect(() => {
    loadTasks();
  }, []);

  // حفظ البيانات عند التحديث
  useEffect(() => {
    if (tasks.length > 0) {
      saveTasks();
    }
  }, [tasks]);

  const loadTasks = async () => {
    try {
      // محاولة تحميل من الخادم
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
      } else {
        // استخدام البيانات الافتراضية
        loadDefaultTasks();
      }
    } catch (error) {
      console.log('استخدام البيانات المحفوظة محلياً');
      const saved = localStorage.getItem('projectTasks');
      if (saved) {
        setTasks(JSON.parse(saved));
      } else {
        loadDefaultTasks();
      }
    }
    setLoading(false);
  };

  const loadDefaultTasks = () => {
    const defaultTasks = [
      // Category: Video Production - New Videos
      { id: 1, title: 'تصوير فيديو - "مو كل تبرع.. يعتبر تبرع"', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'عالي', status: false, type: 'تصوير', notes: '' },
      { id: 2, title: 'مونتاج - "مو كل تبرع.. يعتبر تبرع"', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'عالي', status: false, type: 'مونتاج', notes: '' },
      { id: 3, title: 'تصوير - "تحدي الخير" (بحاجة موافقة)', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'متوسط', status: false, type: 'تصوير', notes: '' },
      { id: 4, title: 'مونتاج - "تحدي الخير"', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'متوسط', status: false, type: 'مونتاج', notes: '' },
      { id: 5, title: 'تصوير في الأبراج - "الحياد والاستقلالية" (سالم)', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'عالي', status: false, type: 'تصوير', notes: '' },
      { id: 6, title: 'مونتاج - "الحياد والاستقلالية"', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'عالي', status: false, type: 'مونتاج', notes: '' },
      { id: 7, title: 'تصوير - "التعليم البديل في مناطق النزاع"', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'عالي', status: false, type: 'تصوير', notes: '' },
      { id: 8, title: 'مونتاج - "التعليم البديل في مناطق النزاع"', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'عالي', status: false, type: 'مونتاج', notes: '' },
      { id: 9, title: 'تخطيط وتصوير - "أول مرة تفكر تتطوع" (مسافر)', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'متوسط', status: false, type: 'تصوير', notes: '' },
      { id: 10, title: 'مونتاج - "أول مرة تفكر تتطوع"', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'متوسط', status: false, type: 'مونتاج', notes: '' },

      // Category: Video Production - Existing Videos
      { id: 11, title: 'استكمال مونتاج - "قصة الطفلة مسك ياسين"', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'عالي', status: false, type: 'مونتاج', notes: '' },
      { id: 12, title: 'استكمال مونتاج - "موقف إنساني غير نظرتي"', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'عالي', status: false, type: 'مونتاج', notes: '' },
      { id: 13, title: 'استكمال مونتاج - "Good news around the World" (3)', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'متوسط', status: false, type: 'مونتاج', notes: '' },
      { id: 14, title: 'استكمال مونتاج - "قصة جمعية رعاية مرضى السرطان"', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'متوسط', status: false, type: 'مونتاج', notes: '' },
      { id: 15, title: 'استكمال مونتاج - "استحقار الحزن على الحيوان"', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'منخفض', status: false, type: 'مونتاج', notes: '' },
      { id: 16, title: 'استكمال مونتاج - "احتياجات النساء في المخيمات"', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'منخفض', status: false, type: 'مونتاج', notes: '' },
      { id: 17, title: 'استكمال مونتاج - "علمني الميدان درس"', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'منخفض', status: false, type: 'مونتاج', notes: '' },
      { id: 18, title: 'استكمال مونتاج - "سقيا الماء"', category: 'إنتاج فيديو', dueDate: 'اليوم', priority: 'منخفض', status: false, type: 'مونتاج', notes: '' },

      // Category: Brief Preparation
      { id: 19, title: 'تجهيز 22 بريف لهذا الأسبوع', category: 'تجهيز البريفات', dueDate: 'اليوم الظهر', priority: 'عالي', status: false, type: 'بريف', notes: '' },

      // Category: Talent Recording
      { id: 20, title: 'تصوير المواهب - نوف', category: 'تصوير المواهب', dueDate: 'الجمعة', priority: 'عالي', status: false, type: 'تصوير', notes: '' },
      { id: 21, title: 'تصوير المواهب - عبدالله', category: 'تصوير المواهب', dueDate: 'الجمعة', priority: 'عالي', status: false, type: 'تصوير', notes: '' },
      { id: 22, title: 'تصوير المواهب - زهر', category: 'تصوير المواهب', dueDate: 'الجمعة', priority: 'عالي', status: false, type: 'تصوير', notes: '' },
      { id: 23, title: 'تصوير المواهب - سالم', category: 'تصوير المواهب', dueDate: 'الجمعة', priority: 'عالي', status: false, type: 'تصوير', notes: '' },
      { id: 24, title: 'تصوير المواهب - هنادي', category: 'تصوير المواهب', dueDate: 'الجمعة', priority: 'عالي', status: false, type: 'تصوير', notes: '' },

      // Category: Script Distribution
      { id: 25, title: 'إرسال سكربت - يوسف', category: 'توزيع السكربتات', dueDate: 'الجمعة', priority: 'متوسط', status: false, type: 'سكربت', notes: '' },
      { id: 26, title: 'إرسال سكربت - عبدالرحمن', category: 'توزيع السكربتات', dueDate: 'الجمعة', priority: 'متوسط', status: false, type: 'سكربت', notes: '' },
      { id: 27, title: 'إرسال سكربت - الهنيامي', category: 'توزيع السكربتات', dueDate: 'الجمعة', priority: 'متوسط', status: false, type: 'سكربت', notes: '' },
      { id: 28, title: 'إرسال سكربت - منى', category: 'توزيع السكربتات', dueDate: 'الجمعة', priority: 'متوسط', status: false, type: 'سكربت', notes: '' },

      // Category: Writing
      { id: 29, title: 'كتابة/تعديل 33 سكربت', category: 'الكتابة', dueDate: 'الجمعة', priority: 'عالي', status: false, type: 'كتابة', notes: '' },

      // Category: Social Media Strategy
      { id: 30, title: 'إعداد Social Media Strategy', category: 'استراتيجية وسائل التواصل', dueDate: 'الجمعة', priority: 'عالي', status: false, type: 'استراتيجية', notes: '' },
      { id: 31, title: 'إعداد Social Media Tracker', category: 'استراتيجية وسائل التواصل', dueDate: 'الجمعة', priority: 'عالي', status: false, type: 'تتبع', notes: '' },

      // Category: Hajj Season Ideas
      { id: 32, title: 'قائمة الأفكار لموسم الحج', category: 'محتوى موسم الحج', dueDate: 'الجمعة', priority: 'عالي', status: false, type: 'أفكار', notes: '' },

      // Category: Brand Guidelines
      { id: 33, title: 'Brand Guideline (IM)', category: 'إرشادات العلامة التجارية', dueDate: 'الجمعة', priority: 'عالي', status: false, type: 'توثيق', notes: '' },
    ];
    setTasks(defaultTasks);
  };

  const saveTasks = async () => {
    try {
      // حفظ محلي
      localStorage.setItem('projectTasks', JSON.stringify(tasks));
      
      // محاولة حفظ على الخادم
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks })
      });
    } catch (error) {
      console.log('تم الحفظ محلياً فقط');
    }
  };

  const categories = ['الكل', 'إنتاج فيديو', 'تجهيز البريفات', 'تصوير المواهب', 'توزيع السكربتات', 'الكتابة', 'استراتيجية وسائل التواصل', 'محتوى موسم الحج', 'إرشادات العلامة التجارية'];
  const priorityColors = {
    عالي: 'bg-red-500/10 text-red-600 border-red-200',
    متوسط: 'bg-amber-500/10 text-amber-600 border-amber-200',
    منخفض: 'bg-blue-500/10 text-blue-600 border-blue-200'
  };

  const filteredTasks = useMemo(() => {
    return filter === 'الكل' 
      ? tasks 
      : tasks.filter(task => task.category === filter);
  }, [tasks, filter]);

  const groupedTasks = useMemo(() => {
    const grouped = {};
    filteredTasks.forEach(task => {
      if (!grouped[task.category]) {
        grouped[task.category] = [];
      }
      grouped[task.category].push(task);
    });
    return grouped;
  }, [filteredTasks]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: !task.status } : task
    ));
  };

  const updateTaskNotes = (id, newNotes) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, notes: newNotes } : task
    ));
  };

  const stats = useMemo(() => {
    const total = filteredTasks.length;
    const completed = filteredTasks.filter(t => t.status).length;
    return { total, completed, percentage: total ? Math.round((completed / total) * 100) : 0 };
  }, [filteredTasks]);

  const getPriorityIcon = (priority) => {
    if (priority === 'عالي') return <AlertCircle className="w-4 h-4" />;
    if (priority === 'متوسط') return <Clock className="w-4 h-4" />;
    return <Zap className="w-4 h-4" />;
  };

  const handleShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    navigator.clipboard.writeText(url);
    alert('تم نسخ رابط المشروع إلى الحافظة! 📋');
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tracker-${new Date().getTime()}.json`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>متتبع المشروع - Project Tracker</title>
        <meta name="description" content="منصة تتبع المشاريع الجماعية" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8" dir="rtl">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">متتبع المشروع</h1>
                <p className="text-slate-400">خطة العمل للأسبوع الحالي</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                <Share2 className="w-4 h-4" />
                شارك
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
              >
                <Download className="w-4 h-4" />
                تصدير
              </button>
            </div>
          </div>

          {/* Progress Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
              <p className="text-slate-400 text-sm mb-2">إجمالي المهام</p>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
              <p className="text-slate-400 text-sm mb-2">المكتملة</p>
              <p className="text-3xl font-bold text-cyan-400">{stats.completed}</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
              <p className="text-slate-400 text-sm mb-2">نسبة الإنجاز</p>
              <div className="flex items-end gap-3">
                <p className="text-3xl font-bold text-emerald-400">{stats.percentage}%</p>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${stats.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  filter === cat
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="max-w-6xl mx-auto space-y-4">
          {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
            <div key={category} className="bg-slate-800/30 border border-slate-700 rounded-xl overflow-hidden backdrop-blur">
              <button
                onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ChevronDown 
                    className={`w-5 h-5 text-cyan-400 transition-transform ${expandedCategory === category ? 'rotate-180' : ''}`}
                  />
                  <h2 className="text-lg font-semibold text-white">{category}</h2>
                  <span className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded-md">
                    {categoryTasks.filter(t => t.status).length}/{categoryTasks.length}
                  </span>
                </div>
                <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all"
                    style={{ width: `${categoryTasks.length ? (categoryTasks.filter(t => t.status).length / categoryTasks.length) * 100 : 0}%` }}
                  />
                </div>
              </button>

              {expandedCategory === category && (
                <div className="border-t border-slate-700 divide-y divide-slate-700">
                  {categoryTasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`px-6 py-4 flex items-start gap-4 cursor-pointer transition-all hover:bg-slate-700/20 ${task.status ? 'bg-slate-700/10' : ''}`}
                    >
                      <div className="pt-1">
                        {task.status ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-500 hover:text-cyan-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${task.status ? 'text-slate-500 line-through' : 'text-white'}`}>
                          {task.title}
                        </p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <span className={`text-xs px-2 py-1 rounded border ${priorityColors[task.priority]} flex items-center gap-1`}>
                            {getPriorityIcon(task.priority)}
                            {task.priority}
                          </span>
                          <span className="text-xs px-2 py-1 rounded bg-slate-700/50 text-slate-300">
                            {task.dueDate}
                          </span>
                          <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-200">
                            {task.type}
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="أضف ملاحظة..."
                          value={task.notes}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateTaskNotes(task.id, e.target.value);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-3 w-full bg-slate-700/30 border border-slate-600 rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-center text-sm">
            آخر تحديث: {new Date().toLocaleDateString('ar-AE')} | جميع التغييرات تُحفظ تلقائياً
          </p>
        </div>
      </div>
    </>
  );
}
